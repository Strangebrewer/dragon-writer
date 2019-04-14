class Project {
  constructor(model) {
    if (!model || typeof model !== 'function')
      throw new Error('A valid model must be given to use this class');
    this.Schema = model;
  }

  async find(query = {}, populate = []) {
    if (typeof populate == 'string') populate.split(',');
    return await this.Schema.find(query).populate(populate);
  }

  async findOneWithAll(id, populate = []) {
    if (typeof populate == 'string') populate.split(',');
    return await this.Schema.findById(id).populate(populate);
  }

  async validateNewProject(req_body, req_user) {
    const validate = { valid: true };
    let lowerCaseLink = req_body.link.toLowerCase();
    const link = /^[a-z]+$/.test(lowerCaseLink);
    if (!link) {
      validate.valid = false;
      validate.msg = "Project keywords must be alpha characters only."
    } else {
      const projects = await this.Schema.find({ userId: req_user._id });
      const keywords = projects.filter(project => (
        project.link === link ? project.link : null
      ));
      if (keywords.length > 0) {
        validate.valid = false;
        validate.msg = "That project keyword is already taken."
      } else if (projects.length > 19) {
        validate.valid = false;
        validate.msg = "You already have the maximum number of projects.";
      }
    }
    return validate
  }

  async createProject(req_body, req_user) {
    req_body.userId = req_user._id;
    req_body.link = req_body.link.toLowerCase();
    const project = await this.Schema.create(req_body);
    return project;
  }
}

module.exports = Project;