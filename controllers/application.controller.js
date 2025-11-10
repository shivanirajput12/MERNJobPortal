import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id; //logged in user id
    const jobId = req.params.id;

    if (!jobId) {
      return res
        .status(400)
        .json({ message: "Job ID is required", success: false });
    }

    //check if the user has already applied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    //check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    //create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job application successful",
      newApplication,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id; //logged in user id
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      });
    if (!application || application.length === 0) {
      return res
        .status(404)
        .json({ message: "No applied jobs found", success: false });
    }
    return res
      .status(200)
      .json({
        message: "Applied jobs fetched successfully",
        application,
        success: true,
      });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

// admin will check how many applicants applied for a particular job
export const getApplicants = async (req, res) => {
  try {
    const { id } = req.params; // job id

    // Find all applications for this job and populate job and applicant details
    const applications = await Application.find({ job: id })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: { path: "company" } // also populate company inside job if needed
      })
      .populate("applicant");

    if (!applications || applications.length === 0) {
      return res
        .status(404)
        .json({ message: "No applicants found for this job", success: false });
    }

    return res
      .status(200)
      .json({
        message: "Applicants fetched successfully",
        applications,
        success: true,
      });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicantionId = req.params.id;

    if (!status) {
      return res
        .status(400)
        .json({ message: "Status is required", success: false });
    }

    //find the application by applicantion id
    const application = await Application.findOne({_id:applicantionId});
    if(!application){
      return res.status(404).json({ message: "Application not found", success: false });
    }

    //update the status
    application.status = status.toLowerCase();
    await application.save();

    return res
      .status(200)
      .json({ message: "Application status updated successfully", application, success: true });    
   
  } catch (err) {
    return res.status(500).json({ message: "Server Error", success: false });
  }
};
