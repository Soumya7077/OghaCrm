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
const promotion = mongoose.model("promotionManagement", promotionSchema, "promotionManagement");
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
    console.log("Found leads:", leads); // Log the leads variable
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
  try {
    const EditId = parseInt(req.params.id);

    const [leadDetails, followupDetails] = await Promise.all([
      leadsCapture.find({ id: EditId }).exec(),
      leadsFollowup.find({ leadId: EditId }).exec(),
    ]);

    const combinedResults = {
      leadsCapture: leadDetails,
      leadsFollowup: followupDetails,
    };

    res.send(combinedResults);
  } catch (error) {
    console.error("Error retrieving lead details:", error);
    res.status(500).json({ error: "An error occurred" });
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
    const lastStaff = await staffManage.findOne({}, { sort: { id: -1 } }).exec();
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
    const staffData = await StaffManage.find({ UserType: type }).exec();

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
    // Connect to the database
    const clientObject = await mongoose.connect(connectionString);
    const database = clientObject.db("Ogha");

    // Retrieve gym packages that are active and for the service with ID 3
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

    // Connect to the database
    const clientObject = await mongoose.connect(connectionString);
    const database = clientObject.db("Ogha");

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

app.get("/getPackageDataByTypeId", (req, res) => {});

// Post method for promotion msg

app.post("/addpromotion", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");

    database
      .collection("promotionManagement")
      .findOne({}, { sort: { id: -1 } })
      .then((lastdocuments) => {
        const lastId = lastdocuments ? lastdocuments.id : 0;
        const newId = lastId + 1;

        const promotion = {
          id: newId,
          promotionName: req.body.promotionName,
          promotionDate: new Date(req.body.promotionDate),
          descriptionEmail: req.body.description1,
          descriptionMessage: req.body.description2,
          createdOn: new Date(req.body.createdOn),
          createdBy: parseInt(req.body.createdBy),
          IsActive: 1,
        };

        database
          .collection("promotionManagement")
          .insertOne(promotion)
          .then((result) => {
            console.log("Promotion Added");
            res.redirect("/promotiongrid");
            res.end();
          });
      });
  });
});

//  Get method for promotion

app.get("/promotion", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("promotionManagement")
      .find({ IsActive: 1 })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

// Edit method for Promotion

app.get("/getPromotionDetails/:id", (req, res) => {
  var id = parseInt(req.params.id);

  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("promotionManagement")
      .find({ id: id })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

// Update(put) method for promotion

app.put("/updatepromotion/:id", (req, res) => {
  var id = parseInt(req.params.id);
  var findQuery = { id: id };
  var updateQuery = {
    $set: {
      promotionName: req.body.promotionName,
      promotionDate: new Date(req.body.promotionDate),
      descriptionEmail: req.body.description1,
      descriptionMessage: req.body.description2,
      modifiedOn: new Date(req.body.createdOn),
      modifiedBy: parseInt(req.body.createdBy),
    },
  };

  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("promotionManagement")
      .updateOne(findQuery, updateQuery)
      .then((result) => {
        console.log("Promotion Updated");
        res.redirect("/promotiongrid");
        res.end();
      });
  });
});

// Delete method for promotion

app.put("/deletePromotion/:id", (req, res) => {
  var id = parseInt(req.params.id);

  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    var findQuery = { id: id };
    var updateQuery = { $set: { IsActive: req.body.IsActive } };

    database
      .collection("promotionManagement")
      .updateOne(findQuery, updateQuery)
      .then((result) => {
        console.log("Promotion Deleted Successfully");
        res.redirect("/promotiongrid");
        res.end();
      });
  });
});

// Get method for subscriber

app.get("/subscriberUser", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("subscriber")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

// get package details by selecting package add subscriber

app.get("/addsubscriber", (req, res) => {
  var id = parseInt(req.query.packageId);
  // console.log(id);
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("packageManagement")
      .find({ id: id })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

// Post method for subscribed user

app.post("/subscriberUser", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("subscriber")
      .findOne({}, { sort: { id: -1 } })
      .then((lastdocuments) => {
        const lastid = lastdocuments ? lastdocuments.id : 0;
        const newPID = lastid + 1;

        var duration = parseInt(req.body.duration);
        var startDate = new Date(req.body.startDate);

        // Make sure duration is a positive number
        if (!isNaN(duration) && duration > 0) {
          var endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + duration);
          console.log(endDate);

          var subscriber = {
            id: newPID,
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
          };

          database
            .collection("subscriber")
            .insertOne(subscriber)
            .then((result) => {
              console.log("Subscriber Added");
            });
        } else {
          console.log("Invalid duration");
        }
      });
  });
});

//  Getting one subscriber data

app.get("/getsubscriberdetails/:id", (req, res) => {
  var id = parseInt(req.params.id);
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("subscriber")
      .find({ id: id })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

// Update Method for subscriber

app.put("/updatesubscriber/:id", (req, res) => {
  var id = parseInt(req.params.id);
  var findQuery = { id: id };
  var updateQuery = {
    $set: {
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
    },
  };
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("subscriber")
      .updateOne(findQuery, updateQuery)
      .then((result) => {
        console.log("Subscriber Updated");
        res.redirect("/subscription");
        res.end();
      });
  });
});

// Getting the value in dropdown

app.get("/customerList", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("leadsCapture")
      .find({ IsActive: 1 })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

// Gym, Spa and Salon Get Method

app.get("/getStaff/:getData", (req, res) => {
  var type = parseInt(req.params.getData);
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    // database.collection("")

    database
      .collection("StaffManage")
      .find({ UserType: type })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

// Get the category values

app.get("/getcategory", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("category")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
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
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
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
  var phone = req.params.phone;
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("leadsCapture")
      .findOne({ phoneNumber: phone, IsActive: 1 })
      .then((documents) => {
        res.send(documents);
        res.status();
        res.end();
      });
  });
});
// Get method for  gym package

app.get("/gympackages", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("packageManagement")
      .find({ IsActive: 1, forService: "3" })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

// Get method for  Spa package

app.get("/spapackages", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("packageManagement")
      .find({ IsActive: 1, forService: "4" })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

//Get Method for salon package

app.get("/salonpackages", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("packageManagement")
      .find({ IsActive: 1, forService: "5" })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

//Get Method for aesthetic packages

app.get("/aestheticpackages", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("packageManagement")
      .find({ IsActive: 1, forService: "6" })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});
// Gym, Spa and Salon Get Method for subscriber

app.get("/getSubscriber/:getData", (req, res) => {
  var type = req.params.getData;
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    // database.collection("")

    database
      .collection("subscriber")
      .find({ subscriptionFor: type })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

// Get Assigned list according to id

app.get("/assignedlist/:id", (req, res) => {
  var id = parseInt(req.params.id);
  var currentDate = new Date();

  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");

    database
      .collection("subscriber")
      .find({
        userId: id,
        startDate: { $gte: currentDate },
      })
      .toArray()
      .then((documents) => {
        res.send(documents);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      })
      .finally(() => {
        clientObject.close();
      });
  });
});

// get the today schedule list

app.get("/todayschedule/:id", (req, res) => {
  var id = parseInt(req.params.id);

  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");

    database
      .collection("subscriber")
      .find({
        userId: id,
        endDate: { $gte: new Date() }, // Use $gte to find dates greater than or equal to the current date
      })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

// add a subscriber for payment

app.post("/addsubscription", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("payment")
      .findOne({}, { sort: { id: -1 } })
      .then((lastdocuments) => {
        const lastid = lastdocuments ? lastdocuments.id : 0;
        const newID = lastid + 1;

        const subscriptionUser = {
          id: newID,
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
        };

        database
          .collection("payment")
          .insertOne(subscriptionUser)
          .then((result) => {
            console.log("Subscribed User Added");
            console.log(subscriptionUser);
            res.redirect("/account");
            res.end();
          });
      });
  });
});

//  Get Payment Method

app.get("/getCustomerList", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("payment")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.get("/getCustomerListById/:id", (req, res) => {
  var id = parseInt(req.params.id);
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("payment")
      .findOne({ id: id })
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.post("/saveattendence", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("customerAttendence")
      .findOne({}, { sort: { id: -1 } })
      .then((lastdocuments) => {
        const lastid = lastdocuments ? lastdocuments.id : 0;
        const newID = lastid + 1;

        const customerAttendence = {
          id: parseInt(req.body.customerId),
          customerName: req.body.customerName,
          phone: req.body.phoneNo,
          email: req.body.email,
          date: new Date(req.body.date),
          intime: req.body.intime,
          outtime: req.body.outtime,
          remarks: req.body.remarks,
          createdOn: new Date(req.body.createdOn),
        };

        database
          .collection("customerAttendence")
          .insertOne(customerAttendence)
          .then((result) => {
            console.log("Customer Attendence Added");
            res.redirect("/account");
            res.end();
          });
      });
  });
});

app.get("/getcustomerAttendence/:id", (req, res) => {
  var id = parseInt(req.params.id);

  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("customerAttendence")
      .find({ id: id })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

// -----------------------------------------------------------------------------------------------------------//
//                                               Reports                                                   //
// -----------------------------------------------------------------------------------------------------------//

// Subscriber Reports
app.get("/getsubscriberreport", async (req, res) => {
  try {
    const fromdate = new Date(req.query.fromdate);
    const todate = new Date(req.query.todate);
    const clientObject = await mongoose.connect(connectionString);
    const database = clientObject.db("Ogha");
    const collection = database.collection("subscriber");

    const query = {
      startDate: {
        $gte: fromdate,
        $lte: todate,
      },
    };

    const result = await collection.find(query).toArray();
    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

// Payment Report
app.get("/getpaymentreport", async (req, res) => {
  try {
    const fromdate = new Date(req.query.fromdate);
    const todate = new Date(req.query.todate);
    const paymentStatus = req.query.paymentStatus;
    console.log(paymentStatus, fromdate, todate);

    const clientObject = await mongoose.connect(connectionString);
    const database = clientObject.db("Ogha");
    const collection = database.collection("payment");

    const query = {
      createdOn: {
        $gte: fromdate,
        $lte: todate,
      },
      paymentStatus: paymentStatus,
    };

    const result = await collection.find(query).toArray();
    res.send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

app.listen(5050);
console.log(`Server started at : https://ogha.onrender.com`);
