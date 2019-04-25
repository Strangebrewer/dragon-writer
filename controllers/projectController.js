const { Project, ProjectModel, UserModel, TextModel, SubjectModel } = require('../models');
const project_model = new Project(ProjectModel)

module.exports = {

  getProjectsWithAll: async function (req, res) {
    ProjectModel.find({ userId: req.user._id })
      .populate('subjects texts')
      .then(response => res.json(response))
      .catch(err => res.status(422).json(err));
  },

  getSingleProject: async function (req, res) {
    ProjectModel.findById(req.params.id)
      .then(response => res.json(response))
      .catch(err => res.status(422).json(err));
  },

  getSingleProjectWithAll: async function (req, res) {
    ProjectModel.findById(req.params.id)
      .populate('subjects texts')
      .then(response => res.json(response))
      .catch(err => res.status(422).json(err));
  },

  createProject: async function (req, res) {
    try {
      const validation = await project_model.validateNewProject(req.body, req.user);
      if (validation.valid) {
        const project = await project_model.createProject(req.body, req.user);
        await UserModel.findByIdAndUpdate(req.user._id,
          { $push: { projects: project._id } },
          { new: true }
        )
        res.json(project);
      }
    } catch (error) {
      res.status(422).json({ error });
    }
  },

  updateProject: async function (req, res) {
    try {
      const project = await ProjectModel
        .findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(project);
    } catch (err) {
      res.send(err);
    }
  },

  deleteProject: async function (req, res) {
    try {
      await TextModel.deleteMany({ projectId: req.params.id });
      await SubjectModel.deleteMany({ projectId: req.params.id });
      await ProjectModel.findByIdAndDelete(req.params.id);
      await UserModel.findByIdAndUpdate(req.user._id,
        { $pull: { projects: req.params.id } },
        { new: true }
      )
      res.json({ message: "Delete complete." });
    }
    catch (err) {
      res.send(err);
    }
  }

}