import { createProject } from "../services/project.service.js";
import {
  addMemberService,
  removeMemberService,
} from "../services/project.service.js";

export const createProjectController = async (req, res, next) => {
  try {
    const data = req.body;
    const user = req.user;
    const project = await createProject(data, user._id);
    res.status(201).json({ status: "success", data: project });
  } catch (error) {
    next(error);
  }
};

export const addMemberController = async (req, res, next) => {
  try {
    const { projectId, memberId } = req.params;
    const project = await addMemberService(projectId, memberId, req.user._id);
    res.status(200).json({ status: "success", data: project });
  } catch (error) {
    next(error);
  }
};

export const removeMemberController = async (req, res, next) => {
  try {
    const { projectId, memberId } = req.params;
    const project = await removeMemberService(
      projectId,
      memberId,
      req.user._id,
    );
    res.status(200).json({
      status: "success",
      message: "Member removed successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};
