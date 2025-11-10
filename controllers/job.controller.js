import Job from "../models/job.model.js";

//admin
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      salary,
      jobType,
      requirements,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id; // logged in user id

    if (
      !title ||
      !description ||
      !location ||
      !salary ||
      !jobType ||
      !position ||
      !companyId ||
      !requirements ||
      !experience
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    // Validate numbers
    if (isNaN(Number(position)) || isNaN(Number(experience))) {
      return res
        .status(400)
        .json({
          message: "Salary, position, and experience must be numbers",
          success: false,
        });
    }

    const job = await Job.create({
      title,
      description,
      location,
      salary,
      jobType,
      position: Number(position),
      company: companyId,
      created_by: userId,
      requirements: requirements.split(","),
      experience: Number(experience),
    });

    return res
      .status(201)
      .json({ message: "Job created successfully", job, success: true });
  } catch (err) {
    console.error("Error in postJob:", err);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

//student
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Jobs fetched successfully", jobs, success: true });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

//student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Job fetched successfully", job, success: true });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

//admin kitne job create kiya abhi tak
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id; // logged in user id
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found for this admin", success: false });
    }
    return res
      .status(200)
      .json({ message: "Jobs fetched successfully", jobs, success: true });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", success: false });
  }
};
