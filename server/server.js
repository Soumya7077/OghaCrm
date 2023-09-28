var mongoClient = require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
var nodemailer = require("nodemailer");
var mongoose = require("mongoose");

var connectionString = "mongodb+srv://Ogha:Ogha2023@cluster0.aryzpwf.mongodb.net/Ogha?retryWrites=true&w=majority&appName=AtlasApp";
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Ogha',
});

const db = mongoose.connection;
// Handle connection events
db.on("connected", () => {
  console.log(`Connected to MongoDB database:Ogha`);
});

db.on("error", (error) => {
  console.error(`MongoDB connection error: ${error}`);
});

db.on("disconnected", () => {
  console.log(`Disconnected from MongoDB`);
});

// Staff type Schema
const staffTypeSchema = new mongoose.Schema({
  id:Number,
  type:String
});

const leadsCaptureSchema = new mongoose.Schema({
  id: Number,
  fullName: String,
  phoneNumber: String,
  emailAddress: String,
  jobTitle: String,
  address: String,
  source: String,
  type: String,
  // visitDate: req.body.folloupDateTime,
  IsActive: Number,
  CreatedOn: Date,

});

const staffManageSchema = new mongoose.Schema({
    id:Number,
    FullName:String,
    PhoneNumber:String,
    Email:String,
    JobTitle:String,
    Address:String,
    UserType:Number,
    UserName:String,
    Password:String,
    CreatedOn:Date,
    IsActive:Number,
    ModifiedOn:Date
});

const categorySchema = new mongoose.Schema({
    id:Number,
    category:String
});

const customerAttendenceSchema = new mongoose.Schema({
    id:Number,
    customerName:String,
    phone:String,
    email:String,
    date:Date,
    intime:String,
    outtime:String,
    remarks:String,
    createdOn:Date
});


const leadsFollowupSchema = new mongoose.Schema({
    id:Number,
    leadId:Number,
    criteria:String,
    folloupDateTime:Date,
    remarks:String,
    CreatedOn:Date,
    IsActive:Number
});


const packageManagementSchema = new mongoose.Schema({
    id:Number,
    img:String,
    packageName:String,
    cost:Number,
    description:String,
    duration:String,
    forService:String,
    CreatedOn:Date,
    IsActive:Number,
    createdBy:Number,
    modifiedBy:Number,
    modifiedOn:Date
});


const paymentSchema = new mongoose.Schema({
    id:Number,
    userName:String,
    phone:String,
    email:String,
    packageId:Number,
    packageName:String,
    cost:Number,
    service:String,
    paymentStatus:String,
    endDate:Date,
    createdOn:Date,
    createdBy:Number,
    IsActive:Number
});


const promotionSchema = new mongoose.Schema({
    id: Number,
    promotionName: String,
    promotionDate: Date,
    descriptionEmail: String,
    descriptionMessage: String,
    createdOn: Date,
    createdBy: Number,
    IsActive: Number,
});

const subscriberSchema = new mongoose.Schema({
  id: Number,
  fullName: String,
  phoneNumber: String,
  email: String,
  subscriptionFor: String,
  subscriptionType: String,
  startDate: Date,
  endDate: Date,
  amountPaid: Number,
  perferedTime: String,
  userId: Number,
  createdBy: Number,
  createdOn: Date,
  modifiedBy: Number,
  modifiedOn: Date,
  isActive: Number,
})



const StaffType = mongoose.model("StaffType", staffTypeSchema, "StaffType");
const leadsCapture = mongoose.model("leadsCapture", leadsCaptureSchema, "leadsCapture");
const staffManage = mongoose.model("StaffManage", staffManageSchema, "StaffManage");
const category = mongoose.model("category", categorySchema, "category");
const customerAttendence = mongoose.model("customerAttendence", customerAttendenceSchema, "customerAttendence");
const leadsFollowup = mongoose.model("leadsFollowup", leadsFollowupSchema, "leadsFollowup");
const packageManagement = mongoose.model("packageManagement", packageManagementSchema, "packageManagement");
const payment = mongoose.model("payment", paymentSchema, "payment");
const promotionManage = mongoose.model("promotionManagement", promotionSchema, "promotionManagement");
const subscriber = mongoose.model("subscriber", subscriberSchema, "subscriber");

var app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

function convertHtmlDescriptionToCommaSeparated(htmlDescription) {
  const $ = cheerio.load(htmlDescription);
  const items = $("li")
    .map((index, element) => $(element).text())
    .get();
  const commaSeparatedDescription = items.join(", ");

  return commaSeparatedDescription;
}



// Get method for stafftype

app.get("/getstafftype", async (req, res) => {
  try {
    const staffTypes = await StaffType.find({});
    res.send(staffTypes);
  } catch (error) {
    console.error("Error retrieving staff types:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Post lead capture data to the database.

app.post("/addlead", async (req, res) => {
  try {
    const folloupDateTime = new Date(req.body.folloupDateTime);
    const CreatedOn = new Date(req.body.CreatedOn);

    // Find the latest lead and follow-up IDs
    const [lastLeadCapture, lastLeadFollowup] = await Promise.all([
      leadsCapture.findOne({}, { sort: { id: -1 } }).exec(),
      leadsFollowup.findOne({}, { sort: { id: -1 } }).exec(),
    ]);

    const newLeadCaptureID = (lastLeadCapture ? lastLeadCapture.id : 0) + 1;
    const newLeadFollowupID = (lastLeadFollowup ? lastLeadFollowup.id : 0) + 1;

    // Create the lead object
    const leadname = {
      id: newLeadCaptureID,
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      emailAddress: req.body.emailAddress,
      jobTitle: req.body.jobTitle,
      address: req.body.address,
      source: req.body.source,
      type: req.body.type,
      IsActive: 1,
      CreatedOn: CreatedOn,
    };

    // Create the lead follow-up object
    const leadFollowup = {
      id: newLeadFollowupID,
      leadId: newLeadCaptureID,
      criteria: req.body.isInterested,
      folloupDateTime: folloupDateTime,
      remarks: req.body.remark,
      CreatedOn: CreatedOn,
      IsActive: 1,
    };

    // Use Mongoose to insert the lead and lead follow-up
    await Promise.all([
      leadsCapture.create(leadname),
      leadsFollowup.create(leadFollowup),
    ]);

    console.log("Lead Added");
    res.status(200).json({ message: "Lead Added" });
  } catch (error) {
    console.error("Error adding lead:", error);
    res.status(500).json({ error: "An error occurred while adding the lead" });
  }
});

app.get("/leadscapture", async (req, res) => {
  try {
    const leads = await leadsCapture.find({ IsActive: 1, type: "Lead" });
    // console.log("Found leads:", leads); // Log the leads variable
    res.send(leads);
  } catch (error) {
    console.error("Error retrieving leads:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


// Leads Followup Get Method

app.get("/getfollowupdata", async (req, res) => {
  try {
    const latestFollowups = await leadsFollowup.aggregate([
      { $match: { IsActive: 1 } },
      { $sort: { leadId: -1, folloupDateTime: -1 } },
      {
        $group: {
          _id: "$leadId",
          latestFollowup: { $first: "$$ROOT" },
        },
      },
    ]);

    res.send(latestFollowups.map((doc) => doc.latestFollowup));
  } catch (error) {
    console.error("Error retrieving latest follow-up data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Followup details post method

app.post("/addFollowupDetails", async (req, res) => {
  try {
    // Create a new follow-up object
    const newFollowup = new leadsFollowup({
      leadId: parseInt(req.body.leadId),
      criteria: req.body.criteria,
      folloupDateTime: req.body.visitDate,
      remarks: req.body.remark,
    });

    // Save the new follow-up document
    await newFollowup.save();

    console.log("Follow-up Details Added");
    res.status(200).json({ message: "Follow-up Details Added" });
  } catch (error) {
    console.error("Error adding follow-up details:", error);
    res.status(500).json({ error: "An error occurred while adding follow-up details" });
  }
});

// Followup details get method

app.get("/followupdetails/:id", async (req, res) => {
  try {
    const EditId = parseInt(req.params.id);

    const followupDetails = await leadsFollowup.find({ leadId: EditId });

    res.send(followupDetails);
  } catch (error) {
    console.error("Error retrieving follow-up details:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// After clicking the 'Edit' button, the specific lead data is displayed in the edit form

app.get("/leadscapture/:id", async (req, res) => {
  try {
    const EditId = parseInt(req.params.id);

    const leadDetails = await leadsCapture.find({ id: EditId });

    res.send(leadDetails);
  } catch (error) {
    console.error("Error retrieving lead details:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});


app.get("/leadscaptureforedit/:id", async (req, res) => {
  const editId = parseInt(req.params.id);

  try {
    const result1 = await leadsCapture.find({ id: editId }).exec();
    const result2 = await leadsFollowup.find({ leadId: editId }).exec();

    const combinedResults = {
      leadsCapture: result1,
      leadsFollowup: result2,
    };

    res.send(combinedResults);
    console.log(combinedResults);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// app.get("/leadscapture/:id", (req, res) => {
//   var EditId = parseInt(req.params.id);
//   mongoose.connect(connectionString).then(clientObject => {
//     var database = clientObject.db("Ogha");

//     const query1 = database.collection("leadsCapture").find({ id: EditId }).toArray();
//     const query2 = database.collection("leadsFollowup").find({ leadId: EditId }).toArray();

//     Promise.all([query1, query2]).then(results => {
//       const [result1, result2] = results;

//       const combinedResults = {
//         leadsCapture: result1,
//         leadsFollowup: result2,
//       };

//       res.send(combinedResults);
//       res.end();
//     })

//     // database.collection("leadsCapture").find({ id: EditId }).toArray().then(document => {
//     //   res.send(document);
//     //   res.end();
//     // })
//   })
// })

// app.get("/leadsfollowupremark/:id", (req, res) => {
//   var EditId = parseInt(req.params.id);
//   mongoose.connect(connectionString).then(clientObject => {
//     var database = clientObject.db("Ogha");
//     database.collection("leadsFollowup").find({ leadId: EditId }).toArray().then(document => {
//       res.send(document);
//       res.end();
//     })
//   })
// })

// The edit form displays the data for updating.

app.put("/updatelead/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const folloupDateTime = new Date(req.body.folloupDateTime);

    // Update lead details
    const leadUpdateQuery = {
      $set: {
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        emailAddress: req.body.emailAddress,
        jobTitle: req.body.jobTitle,
        address: req.body.address,
        source: req.body.source,
        isInterested: req.body.isInterested,
        folloupDateTime: folloupDateTime,
      },
    };

    const leadUpdateResult = await leadsCapture.updateOne({ id: id }, leadUpdateQuery);

    // Update follow-up details
    const followupUpdateQuery = {
      $set: {
        criteria: req.body.isInterested,
        folloupDateTime: folloupDateTime,
        remarks: req.body.remark,
        IsActive: 1,
      },
    };

    const followupUpdateResult = await leadsFollowup.updateOne({ leadId: id }, followupUpdateQuery);

    if (leadUpdateResult.nModified > 0 || followupUpdateResult.nModified > 0) {
      console.log("Lead Updated");
      res.status(200).json({ message: "Lead Updated" });
    } else {
      console.log("No changes made to lead");
      res.status(200).json({ message: "No changes made to lead" });
    }
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).json({ error: "An error occurred while updating the lead" });
  }
});

// Update Leads to Walkin on the basis of phone no

app.put("/updateleadstowalkin/:id", async (req, res) => {
  try {
    const phone = req.params.id;
    const type = req.body.type;
    const remark = req.body.remark;
    
    const findQuery = { phoneNumber: phone };
    const updateQuery = { $set: { type: type, Remark: remark } };

    // Update leads to "Walkin" type
    const updateResult = await leadsCapture.updateOne(findQuery, updateQuery);

    if (updateResult.nModified > 0) {
      console.log("Leads updated to Walkin");
      res.status(200).json({ message: "Leads updated to Walkin" });
    } else {
      console.log("No leads found or no changes made");
      res.status(404).json({ error: "No leads found or no changes made" });
    }
  } catch (error) {
    console.error("Error updating leads to Walkin:", error);
    res.status(500).json({ error: "An error occurred while updating leads" });
  }
});

// Deleting Lead Details by updating IsActive to 0.

app.put("/deletelead/:leadid", async (req, res) => {
  try {
    const id = parseInt(req.params.leadid);
    const isActive = parseInt(req.body.IsActive);

    // Update lead's IsActive status
    const leadUpdateQuery = {
      $set: { IsActive: isActive },
    };

    // Update the lead's IsActive status in leadsCapture
    const leadUpdateResult = await leadsCapture.updateOne({ id: id }, leadUpdateQuery);

    // Update the lead's IsActive status in leadsFollowup
    const followupUpdateResult = await leadsFollowup.updateOne({ leadId: id }, leadUpdateQuery);

    if (leadUpdateResult.nModified > 0 || followupUpdateResult.nModified > 0) {
      console.log(`Lead ${id} updated with IsActive set to ${isActive}`);
      res.status(200).json({ message: `Lead ${id} updated with IsActive set to ${isActive}` });
    } else {
      console.log(`No changes made to lead ${id}`);
      res.status(404).json({ error: `No changes made to lead ${id}` });
    }
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).json({ error: "An error occurred while updating the lead" });
  }
});

// Customer Walkin Get Method

app.get("/getWalkinCustomer", async (req, res) => {
  try {
    const walkinCustomers = await leadsCapture.find({ IsActive: 1, type: "Walkin" }).exec();
    res.send(walkinCustomers);
  } catch (error) {
    console.error("Error retrieving Walkin customers:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Customer Walkin Post Method

app.post("/addWalkin", async (req, res) => {
  try {
    // Find the latest ID in the leadsCapture collection
    const lastLeadCapture = await leadsCapture.findOne({}, { sort: { id: -1 } }).exec();
    const lastId = lastLeadCapture ? lastLeadCapture.id : 0;
    const newId = lastId + 1;

    // Create a new Walkin customer object
    const walkinCustomer = new leadsCapture({
      id: newId,
      fullName: req.body.name,
      phoneNumber: req.body.phone,
      type: "Walkin",
      emailAddress: req.body.email,
      Remark: req.body.remark,
      CreatedOn: new Date(req.body.CreatedOn),
      CreatedBy: parseInt(req.body.CreatedBy),
      IsActive: 1,
    });

    // Save the new Walkin customer document
    await walkinCustomer.save();

    console.log("Walkin Customer Added");
    res.status(200).json({ message: "Walkin Customer Added" });
  } catch (error) {
    console.error("Error adding Walkin customer:", error);
    res.status(500).json({ error: "An error occurred while adding the Walkin customer" });
  }
});

// Edit method for Walkin Customers

app.get("/getWalkinDetails/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const walkinDetails = await leadsCapture.find({ id: id }).exec();

    if (walkinDetails.length === 0) {
      res.status(404).json({ error: "Walkin details not found" });
    } else {
      res.send(walkinDetails);
    }
  } catch (error) {
    console.error("Error retrieving Walkin details:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Update method for Walkin Customers

app.put("/updateWalkin/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Find the Walkin customer by ID and update its details
    const updateQuery = {
      $set: {
        fullName: req.body.name,
        phoneNumber: req.body.phone,
        emailAddress: req.body.email,
        Remark: req.body.remark,
        ModifiedOn: new Date(req.body.CreatedOn),
        ModifiedBy: parseInt(req.body.CreatedBy),
        IsActive: 1,
      },
    };

    const result = await leadsCapture.updateOne({ id: id }, updateQuery).exec();

    if (result.nModified === 0) {
      res.status(404).json({ error: "Walkin customer not found" });
    } else {
      console.log("Walkin Customer Updated");
      res.status(200).json({ message: "Walkin Customer Updated" });
    }
  } catch (error) {
    console.error("Error updating Walkin customer:", error);
    res.status(500).json({ error: "An error occurred while updating Walkin customer" });
  }
});

// Post Method for Staff

app.post("/addstaff", async (req, res) => {
  try {
    // Find the latest ID in the StaffManage collection
    const lastStaff = await staffManage.findOne({}, { sort: { id: -1 } });
    const lastId = lastStaff ? lastStaff.id : 0;
    const newId = lastId + 1;

    // Create a new staff object
    const staff = new staffManage({
      id: newId,
      FullName: req.body.name,
      PhoneNumber: req.body.phone,
      Email: req.body.email,
      JobTitle: req.body.job,
      Address: req.body.address,
      UserType: parseInt(req.body.usertype),
      UserName: req.body.username,
      Password: req.body.password,
      CreatedOn: new Date(req.body.CreatedOn),
      createdBy: parseInt(req.body.createdBy),
      IsActive: 1,
    });

    // Save the new staff document
    await staff.save();

    console.log("Staff Added");
    res.status(200).json({ message: "Staff Added" });
  } catch (error) {
    console.error("Error adding staff:", error);
    res.status(500).json({ error: "An error occurred while adding staff" });
  }
});

// Get Method for Staff

app.get("/getstaffdetails", async (req, res) => {

  try{
    const staffDetails = await staffManage.find({});
    res.send(staffDetails);
  }catch(error){
    console.error("Error retrieving staff types:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Edit Method for Staff

app.get("/editstaff/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Find staff details based on the provided ID
    const staffDetails = await staffManage.find({ id: id }).exec();

    if (staffDetails.length === 0) {
      res.status(404).json({ error: "Staff details not found" });
    } else {
      res.send(staffDetails);
    }
  } catch (error) {
    console.error("Error retrieving staff details for editing:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// update method for staff
app.put("/updatestaff/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Create an update object with the provided data
    const updateQuery = {
      $set: {
        FullName: req.body.name,
        PhoneNumber: req.body.phone,
        Email: req.body.email,
        JobTitle: req.body.job,
        Address: req.body.address,
        UserType: parseInt(req.body.usertype),
        UserName: req.body.username,
        Password: req.body.password,
        ModifiedOn: new Date(req.body.CreatedOn),
        modifiedBy: parseInt(req.body.createdBy),
      },
    };

    // Find and update the staff document based on the provided ID
    const result = await staffManage.updateOne({ id: id }, updateQuery).exec();

    if (result.nModified === 0) {
      res.status(404).json({ error: "Staff not found or no changes were made" });
    } else {
      console.log("Staff Updated");
      res.status(200).json({ message: "Staff Updated" });
    }
  } catch (error) {
    console.error("Error updating staff:", error);
    res.status(500).json({ error: "An error occurred while updating staff" });
  }
});

// Delete(Put) method for staff

app.put("/deletestaff/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Create an update object to set IsActive based on the request body
    const updateQuery = { $set: { IsActive: req.body.IsActive } };

    // Find and update the staff document based on the provided ID
    const result = await staffManage.updateOne({ id: id }, updateQuery).exec();

    if (result.nModified === 0) {
      res.status(404).json({ error: "Staff not found or no changes were made" });
    } else {
      console.log("Staff Deleted Successfully");
      res.status(200).json({ message: "Staff Deleted Successfully" });
    }
  } catch (error) {
    console.error("Error deleting staff:", error);
    res.status(500).json({ error: "An error occurred while deleting staff" });
  }
});

// Get staff data by user type
app.get("/getStaffData/:type", async (req, res) => {
  try {
    const type = parseInt(req.params.type);

    // Find staff data based on the provided user type
    const staffData = await staffManage.find({ UserType: type }).exec();

    res.send(staffData);
  } catch (error) {
    console.error("Error retrieving staff data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Get method for package manage

app.get("/getpackages", async (req, res) => {
  try {
    // Find packages with IsActive status equal to 1
    const packages = await packageManagement.find({ IsActive: 1 }).exec();

    res.send(packages);
  } catch (error) {
    console.error("Error retrieving packages:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Post method for packages

app.post("/addpackages", async (req, res) => {
  try {
    // Find the last document to determine the new ID
    const lastPackage = await packageManagement.findOne({}, {}, { sort: { id: -1 } });
    const newId = lastPackage ? lastPackage.id + 1 : 1;

    // Create a new package object based on request data
    const newPackage = new packageManagement({
      id: newId,
      img: req.body.packageImage,
      packageName: req.body.packageName,
      cost: parseFloat(req.body.packageCost),
      description: req.body.description,
      duration: req.body.packageDuration,
      forService: req.body.service,
      CreatedOn: new Date(req.body.createdOn),
      IsActive: 1,
      createdBy: parseInt(req.body.createdBy),
    });

    // Convert HTML description to comma-separated format
    const commaSeparatedDescription = convertHtmlDescriptionToCommaSeparated(req.body.description);
    newPackage.description = commaSeparatedDescription;

    // Save the new package to the database
    await newPackage.save();

    console.log("Package Added");
    res.redirect("/packagegrid");
  } catch (error) {
    console.error("Error adding package:", error);
    res.status(500).json({ error: "An error occurred while adding the package" });
  }
});

// Edit Package Details

app.get("/getPackageDetails/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Find the package details by ID
    const packageDetails = await packageManagement.find({ id: id }).exec();

    res.send(packageDetails);
  } catch (error) {
    console.error("Error retrieving package details:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//  Update method for package management.

app.put("/updatePackage/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const commaSeparatedDescription = convertHtmlDescriptionToCommaSeparated(req.body.description);
    const findQuery = { id: id };

    const update = {
      img: req.body.packageImage,
      packageName: req.body.packageName,
      cost: parseFloat(req.body.packageCost),
      description: commaSeparatedDescription,
      duration: req.body.packageDuration,
      forService: req.body.service,
      modifiedOn: new Date(req.body.createdOn),
      modifiedBy: parseInt(req.body.createdBy),
    };

    // Update the package using Mongoose
    await packageManagement.findOneAndUpdate(findQuery, update);

    console.log("Package Updated");
    res.end();
  } catch (error) {
    console.error("Error updating package:", error);
    res.status(500).send("Error updating package");
  }
});


// Delete (Put ) method for Package
app.put("/deletePackage/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const findQuery = { id: id };
    const updateQuery = { $set: { IsActive: req.body.IsActive } };

    // Update the package to set IsActive to the provided value
    await packageManagement.findOneAndUpdate(findQuery, updateQuery);

    res.send("Package Deleted Successfully");
  } catch (error) {
    console.error("Error deleting package:", error);
    res.status(500).send("Error deleting package");
  } finally {
    res.redirect("/usermanage");
    res.end();
  }
});

// Display Gym Package
app.get("/getGymPackage", async (req, res) => {
  try {
    const gymPackages = await packageManagement.find({ forService: "3", IsActive: 1 });

    // Send the retrieved gym packages as the response
    res.send(gymPackages);
  } catch (error) {
    console.error("Error retrieving gym packages:", error);
    res.status(500).send("Error retrieving gym packages");
  } finally {
    res.end();
  }
});

//  Display packages according to category

app.get("/getCategorywisePackage/:type", async (req, res) => {
  try {
    const type = req.params.type;

    // Retrieve category-wise packages that are active
    const categoryWisePackages = await packageManagement.find({ forService: type, IsActive: 1 });

    // Send the retrieved packages as the response
    res.send(categoryWisePackages);
  } catch (error) {
    console.error("Error retrieving category-wise packages:", error);
    res.status(500).send("Error retrieving category-wise packages");
  } finally {
    res.end();
  }
});

// get package  data by type and id

// app.get("/getPackageDataByTypeId", (req, res) => {});

// Post method for promotion msg

app.post("/addpromotion", async (req, res) => {
  try {
    // Find the last promotion to determine the new ID
    const lastPromotion = await promotionManage.findOne({}, { sort: { id: -1 } });
    const newId = lastPromotion ? lastPromotion.id + 1 : 1;

    // Create a new promotion object
    const promotion = new promotionManage({
      id: newId,
      promotionName: req.body.promotionName,
      promotionDate: new Date(req.body.promotionDate),
      descriptionEmail: req.body.description1,
      descriptionMessage: req.body.description2,
      createdOn: new Date(req.body.createdOn),
      createdBy: parseInt(req.body.createdBy),
      IsActive: 1,
    });

    // Save the new promotion to the database
    await promotion.save();

    console.log("Promotion Added");
    res.redirect("/promotiongrid");
  } catch (error) {
    console.error("Error adding promotion:", error);
    res.status(500).send("Error adding promotion");
  } finally {
    res.end();
  }
});

//  Get method for promotion

app.get("/promotion", async (req, res) => {
  try {

    // Fetch active promotions using the Mongoose model
    const activePromotions = await promotionManage.find({ IsActive: 1 }).exec();

    res.send(activePromotions);
  } catch (error) {
    console.error("Error fetching promotions:", error);
    res.status(500).send("Error fetching promotions");
  } finally {
    res.end();
  }
});

// Edit method for Promotion

app.get("/getPromotionDetails/:id", async (req, res) => {
  try {
    // Parse the promotion ID from the request parameters
    const id = parseInt(req.params.id);

    // Fetch promotion details by ID using the Mongoose model
    const promotionDetails = await promotionManage.find({ id: id }).exec();

    res.send(promotionDetails);
  } catch (error) {
    console.error("Error fetching promotion details:", error);
    res.status(500).send("Error fetching promotion details");
  } finally {
    res.end();
  }
});

// Update(put) method for promotion

app.put("/updatepromotion/:id", async (req, res) => {
  try {
    // Parse the promotion ID from the request parameters
    const id = parseInt(req.params.id);

    // Create an update object with the new values
    const updateObject = {
      promotionName: req.body.promotionName,
      promotionDate: new Date(req.body.promotionDate),
      descriptionEmail: req.body.description1,
      descriptionMessage: req.body.description2,
      modifiedOn: new Date(req.body.createdOn),
      modifiedBy: parseInt(req.body.createdBy),
    };

    // Update the promotion using Mongoose
    await promotionManage.updateOne({ id: id }, updateObject);

    console.log("Promotion Updated");
    res.redirect("/promotiongrid");
  } catch (error) {
    console.error("Error updating promotion:", error);
    res.status(500).send("Error updating promotion");
  } finally {
    res.end();
  }
});

// Delete method for promotion

app.put("/deletePromotion/:id", async (req, res) => {
  try {
    // Parse the promotion ID from the request parameters
    const id = parseInt(req.params.id);

    // Create an update object to set IsActive based on the request body
    const updateObject = {
      $set: { IsActive: req.body.IsActive },
    };

    // Update the promotion using Mongoose
    await promotionManage.updateOne({ id: id }, updateObject);

    console.log("Promotion Deleted Successfully");
    res.redirect("/promotiongrid");
  } catch (error) {
    console.error("Error deleting promotion:", error);
    res.status(500).send("Error deleting promotion");
  } finally {
    res.end();
  }
});

// Get method for subscriber

app.get("/subscriberUser", async (req, res) => {
  try {
    // Use the Mongoose model to query the "Subscriber" collection
    const subscribers = await subscriber.find({});

    res.send(subscribers);
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    res.status(500).send("Error fetching subscribers");
  } finally {
    res.end();
  }
});

// get package details by selecting package add subscriber

// app.get("/addsubscriber", (req, res) => {
//   var id = parseInt(req.query.packageId);
//   // console.log(id);
//   mongoose.connect(connectionString).then((clientObject) => {
//     var database = clientObject.db("Ogha");
//     database
//       .collection("packageManagement")
//       .find({ id: id })
//       .toArray()
//       .then((documents) => {
//         res.send(documents);
//         res.end();
//       });
//   });
// });

// Post method for subscribed user

app.post("/subscriberUser", async (req, res) => {
  try {

    // Find the last subscriber document to determine the new ID
    const lastSubscriber = await subscriber.findOne({}, {}, { sort: { id: -1 } });

    // Calculate the new subscriber ID
    const newSubscriberID = (lastSubscriber ? lastSubscriber.id : 0) + 1;

    const duration = parseInt(req.body.duration);
    const startDate = new Date(req.body.startDate);

    // Make sure duration is a positive number
    if (!isNaN(duration) && duration > 0) {
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + duration);

      const newSubscriber = new subscriber({
        id: newSubscriberID,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        subscriptionFor: req.body.subscriptionFor,
        subscriptionType: req.body.subscriptionType,
        startDate: startDate,
        endDate: endDate,
        amountPaid: req.body.amountPaid,
        perferedTime: req.body.perferedTime,
        userId: parseInt(req.body.userId),
        createdBy: parseInt(req.body.createdBy),
        createdOn: new Date(req.body.createdOn),
        modifiedBy: req.body.modifiedBy,
        modifiedOn: new Date(req.body.modifiedOn),
        isActive: 1,
      });

      // Save the new subscriber document
      await newSubscriber.save();

      console.log("Subscriber Added");
    } else {
      console.log("Invalid duration");
    }

    res.end();
  } catch (error) {
    console.error("Error adding subscriber:", error);
    res.status(500).send("Error adding subscriber");
  } finally {
    res.end();
  }
});

//  Getting one subscriber data

app.get("/getsubscriberdetails/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const subscribers = await subscriber.findOne({ id: id });

    if (subscribers) {
      res.send([subscribers]); // Wrap the subscriber in an array to match the expected response format
    } else {
      res.status(404).send("Subscriber not found");
    }
  } catch (error) {
    console.error("Error retrieving subscriber details:", error);
    res.status(500).send("Error retrieving subscriber details");
  } finally {
    res.end();
  }
});

// Update Method for subscriber

app.put("/updatesubscriber/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const findQuery = { id: id };

    // Create an object with updated subscriber details
    const updatedSubscriber = {
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      subscriptionFor: req.body.subscriptionFor,
      subscriptionType: req.body.subscriptionType,
      startDate: new Date(req.body.startDate),
      amountPaid: req.body.amountPaid,
      perferedTime: req.body.perferedTime,
      modifiedOn: new Date(req.body.createdOn),
      modifiedBy: parseInt(req.body.createdBy),
      userId: parseInt(req.body.userId),
      isActive: 1,
    };

    const result = await subscriber.updateOne(findQuery, updatedSubscriber);

    if (result.nModified === 1) {
      console.log("Subscriber Updated");
      res.redirect("/subscription");
    } else {
      res.status(404).send("Subscriber not found or no changes made");
    }
  } catch (error) {
    console.error("Error updating subscriber:", error);
    res.status(500).send("Error updating subscriber");
  } finally {
    res.end();
  }
});

// Getting the value in dropdown

app.get("/customerList", async (req, res) => {
  try {
    // Use the Mongoose model to find active customers
    const customers = await leadsCapture.find({ IsActive: 1 }).exec();

    res.send(customers);
  } catch (error) {
    console.error("Error fetching customer list:", error);
    res.status(500).send("Error fetching customer list");
  } finally {
    res.end();
  }
});

// Gym, Spa and Salon Get Method


app.get("/getStaff/:getData", async (req, res) => {
  try {
    const userType = parseInt(req.params.getData);
    // Use the Mongoose model to find staff members by user type
    const staffMembers = await staffManage.find({ UserType: userType }).exec();

    res.send(staffMembers);
  } catch (error) {
    console.error("Error fetching staff members:", error);
    res.status(500).send("Error fetching staff members");
  } finally {
    res.end();
  }
});

// Get the category values

app.get("/getcategory", async (req, res) => {
  try {

    // Use the Mongoose model to find all categories
    const categories = await category.find({}).exec();

    res.send(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Error fetching categories");
  } finally {
    res.end();
  }
});
// Sending Mail functionality to one customer

app.post("/sendmail", (req, res) => {
  // console.log(req.body);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "soumya05ranjan@gmail.com",
      pass: "omxnmogdokgduolo",
    },
  });

  var mailOptions = {
    from: "soumya05ranjan@gmail.com",
    to: req.body.selectedEmailAddress,
    subject: "Offer Closes Soon!!",
    text: req.body.mailBody,
    // html:'' ,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

// app.get("/getWalkinData/:phone", (req, res) => {
//   var phone = req.params.phone;
//   mongoose.connect(connectionString).then(clientObject => {
//     var database = clientObject.db("Ogha");
//     database.collection("leadsCapture").find({ phoneNumber: phone, IsActive:1 }).toArray().then(documents => {
//       res.send(documents);
//       res.status();
//       res.end();
//     })
//   })
// });

app.get("/getWalkinData/:phone", (req, res) => {
  const phone = req.params.phone;

  leadsCapture.findOne({ phoneNumber: phone, IsActive: 1 })
    .then((document) => {
      if (document) {
        res.status(200).send(document);
      } else {
        res.status(404).send("Walkin data not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching walkin data:", error);
      res.status(500).send("Internal Server Error");
    });
});
// Get method for  gym package

app.get("/gympackages", (req, res) => {
  packageManagement.find({ IsActive: 1, forService: "3" })
    .then((documents) => {
      res.send(documents);
    })
    .catch((error) => {
      console.error("Error fetching gym packages:", error);
      res.status(500).send("Internal Server Error");
    });
});

// Get method for  Spa package

app.get("/spapackages", (req, res) => {
  packageManagement.find({ IsActive: 1, forService: "4" })
    .then((documents) => {
      res.send(documents);
    })
    .catch((error) => {
      console.error("Error fetching spa packages:", error);
      res.status(500).send("Internal Server Error");
    });
});

//Get Method for salon package

app.get("/salonpackages", (req, res) => {
  packageManagement.find({ IsActive: 1, forService: "5" })
    .then((documents) => {
      res.send(documents);
    })
    .catch((error) => {
      console.error("Error fetching salon packages:", error);
      res.status(500).send("Internal Server Error");
    });
});

//Get Method for aesthetic packages

app.get("/aestheticpackages", (req, res) => {
  packageManagement.find({ IsActive: 1, forService: "6" })
    .then((documents) => {
      res.send(documents);
    })
    .catch((error) => {
      console.error("Error fetching aesthetic packages:", error);
      res.status(500).send("Internal Server Error");
    });
});
// Gym, Spa and Salon Get Method for subscriber

app.get("/getSubscriber/:getData", (req, res) => {
  const type = req.params.getData;
  subscriber.find({ subscriptionFor: type })
    .then((documents) => {
      res.send(documents);
    })
    .catch((error) => {
      console.error("Error fetching subscribers:", error);
      res.status(500).send("Internal Server Error");
    });
});

// Get Assigned list according to id

app.get("/assignedlist/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const currentDate = new Date();

  subscriber.find({
    userId: id,
    startDate: { $gte: currentDate },
  })
    .then((documents) => {
      res.send(documents);
    })
    .catch((error) => {
      console.error("Error fetching assigned subscribers:", error);
      res.status(500).send("Internal Server Error");
    });
});

// get the today schedule list

app.get("/todayschedule/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const currentDate = new Date();

  subscriber.find({
    userId: id,
    endDate: { $gte: currentDate }, // Use $gte to find dates greater than or equal to the current date
  })
    .then((documents) => {
      res.send(documents);
    })
    .catch((error) => {
      console.error("Error fetching today's schedule:", error);
      res.status(500).send("Internal Server Error");
    });
});

// add a subscriber for payment

app.post("/addsubscription", (req, res) => {
  const subscriptionUser = new payment({
    userName: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    packageId: parseInt(req.body.packageId),
    packageName: req.body.packageName,
    cost: req.body.packageCost,
    service: req.body.service,
    paymentStatus: req.body.paymentStatus,
    endDate: new Date(req.body.endDate),
    createdOn: new Date(req.body.createdOn),
    createdBy: parseInt(req.body.createdBy),
    IsActive: 1,
  });

  subscriptionUser.save()
    .then((result) => {
      console.log("Subscribed User Added");
      console.log(subscriptionUser);
      res.redirect("/account");
    })
    .catch((error) => {
      console.error("Error adding subscribed user:", error);
      res.status(500).send("Internal Server Error");
    });
});

//  Get Payment Method

app.get("/getCustomerList", (req, res) => {
  payment.find({})
    .then((documents) => {
      res.send(documents);
    })
    .catch((error) => {
      console.error("Error fetching customer list:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/getCustomerListById/:id", (req, res) => {
  const id = parseInt(req.params.id);

  payment.findOne({ id: id })
    .then((document) => {
      if (document) {
        res.status(200).send(document);
      } else {
        res.status(404).send("Customer not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching customer by ID:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/saveattendence", (req, res) => {
  const newCustomerAttendance = new customerAttendence({
    id: parseInt(req.body.customerId),
    customerName: req.body.customerName,
    phone: req.body.phoneNo,
    email: req.body.email,
    date: new Date(req.body.date),
    intime: req.body.intime,
    outtime: req.body.outtime,
    remarks: req.body.remarks,
    createdOn: new Date(req.body.createdOn),
  });

  newCustomerAttendance.save()
    .then((result) => {
      console.log("Customer Attendance Added");
      res.redirect("/account");
    })
    .catch((error) => {
      console.error("Error adding customer attendance:", error);
      res.status(500).send("Error adding customer attendance");
    });
});

app.get("/getcustomerAttendence/:id", (req, res) => {
  const id = parseInt(req.params.id);

  customerAttendence.find({ id: id })
    .then((documents) => {
      res.send(documents);
    })
    .catch((error) => {
      console.error("Error fetching customer attendance:", error);
      res.status(500).send("Internal Server Error");
    });
});

// -----------------------------------------------------------------------------------------------------------//
//                                               Reports                                                   //
// -----------------------------------------------------------------------------------------------------------//

// Subscriber Reports
app.get("/getsubscriberreport", async (req, res) => {
  try {
    const fromDateString = req.query.fromdate;
    const toDateString = req.query.todate;

    // Validate date strings
    if (!fromDateString || !toDateString) {
      return res.status(400).json({ error: "Both fromdate and todate are required." });
    }

    const fromDate = new Date(fromDateString);
    const toDate = new Date(toDateString);

    if (isNaN(fromDate) || isNaN(toDate)) {
      return res.status(400).json({ error: "Invalid date format. Please provide dates in a valid format." });
    }

    // Use your Mongoose model to query the database
    const result = await subscriber.find({
      startDate: {
        $gte: fromDate,
        $lte: toDate,
      },
    });

    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

// Payment Report
app.get("/getpaymentreport", async (req, res) => {
  try {
    const fromDateString = req.query.fromdate;
    const toDateString = req.query.todate;
    const paymentStatus = req.query.paymentStatus;

    // Validate date strings and paymentStatus
    if (!fromDateString || !toDateString || !paymentStatus) {
      return res.status(400).json({ error: "fromdate, todate, and paymentStatus are required." });
    }

    const fromDate = new Date(fromDateString);
    const toDate = new Date(toDateString);

    if (isNaN(fromDate) || isNaN(toDate)) {
      return res.status(400).json({ error: "Invalid date format. Please provide dates in a valid format." });
    }

    // Use your Mongoose model to query the database
    const result = await payment.find({
      createdOn: {
        $gte: fromDate,
        $lte: toDate,
      },
      paymentStatus: paymentStatus,
    });

    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});


app.listen(5050);
console.log(`Server started at : https://ogha.onrender.com`);
