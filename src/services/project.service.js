import Project from "../models/project.model.js";
import User from "../models/user.model.js";

export const createProject = async (data, userId) => {
  const project = await Project.create({
    ...data,
    owner: userId,
    members: [userId],
  });
  return project;
};

export const removeMemberService = async (projectId, memberId, ownerId) => {
  const project = await validateProjectAccess(projectId, ownerId);
  await validateMember(memberId);

  if (project.owner.toString() === memberId.toString()) {
    const error = new Error("Owner cannot be removed from project");
    error.status = 400;
    throw error;
  }
  const isMember = project.members.some(
    (member) => member.toString() === memberId.toString(),
  );

  if (!isMember) {
    const error = new Error("User is not a member of this project");
    error.status = 400;
    throw error;
  }

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    { $pull: { members: memberId } },
    { new: true },
  ).populate("members", "name email");

  return updatedProject;
};

export const addMemberService = async (projectId, memberId, ownerId) => {
  const project = await validateProjectAccess(projectId, ownerId);
  await validateMember(memberId);
  validateMemberNotExists(project, memberId);

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    { $addToSet: { members: memberId } },
    { new: true },
  ).populate("members", "name email");

  return updatedProject;
};

const validateProjectAccess = async (projectId, ownerId) => {
  const project = await Project.findById(projectId);

  if (!project) {
    const error = new Error("Project not found");
    error.status = 404;
    throw error;
  }

  if (project.owner.toString() !== ownerId.toString()) {
    const error = new Error(
      "Unauthorized, you do not have permission to perform",
    );
    error.status = 403;
    throw error;
  }

  return project;
};

export const validateMember = async (memberId) => {
  const user = await User.findById(memberId);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return user;
};

export const validateMemberNotExists = (project, memberId) => {
  if (project.members.includes(memberId)) {
    const error = new Error("User is already a member");
    error.status = 400;
    throw error;
  }
};
