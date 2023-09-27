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





const StaffType = mongoose.model("StaffType", staffTypeSchema, "StaffType");
const leadsCapture = mongoose.model("leadsCapture", leadsCaptureSchema, "leadsCapture");
const staffManage = mongoose.model("StaffManage", staffManageSchema, "StaffManage");
const category = mongoose.model("category", categorySchema, "category");
const customerAttendence = mongoose.model("customerAttendence", customerAttendenceSchema, "customerAttendence");

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

app.post("/addlead", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    var folloupDateTime = new Date(req.body.folloupDateTime);

    Promise.all([
      database.collection("leadsCapture").findOne({}, { sort: { id: -1 } }),
      database.collection("leadsFollowup").findOne({}, { sort: { id: -1 } }),
    ]).then(([lastLeadCapture, lastLeadFollowup]) => {
      const newLeadCaptureID = (lastLeadCapture ? lastLeadCapture.id : 0) + 1;
      const newLeadFollowupID =
        (lastLeadFollowup ? lastLeadFollowup.id : 0) + 1;
      const CreatedOn = new Date(req.body.CreatedOn);

      var leadname = {
        id: newLeadCaptureID,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        emailAddress: req.body.emailAddress,
        jobTitle: req.body.jobTitle,
        address: req.body.address,
        source: req.body.source,
        type: req.body.type,
        // visitDate: req.body.folloupDateTime,
        IsActive: 1,
        CreatedOn: CreatedOn,
      };

      var leadFollowup = {
        id: newLeadFollowupID,
        leadId: newLeadCaptureID,
        criteria: req.body.isInterested,
        folloupDateTime: folloupDateTime,
        remarks: req.body.remark,
        CreatedOn: CreatedOn,
        IsActive: 1,
      };
      database
        .collection("leadsCapture")
        .insertOne(leadname)
        .then((result) => {});
      database
        .collection("leadsFollowup")
        .insertOne(leadFollowup)
        .then((result) => {
          console.log("Lead Added");
        });
    });
  });
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

app.get("/getfollowupdata", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("leadsFollowup")
      .aggregate([
        { $match: { IsActive: 1 } },
        { $sort: { leadId: -1, folloupDateTime: -1 } },
        {
          $group: {
            _id: "$leadId",
            latestFollowup: { $first: "$$ROOT" },
          },
        },
      ])
      .toArray()
      .then((documents) => {
        const latestData = documents.map((doc) => doc.latestFollowup);
        res.send(latestData);
        res.end();
      });
  });
});

// Followup details post method

app.post("/addFollowupDetails", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("leadsFollowup")
      .findOne({}, { sort: { id: -1 } })
      .then((lastdocuments) => {
        const lastid = lastdocuments ? lastdocuments.id : 0;
        const newPID = lastid + 1;

        var leadFollowup = {
          id: newPID,
          leadId: parseInt(req.body.leadId),
          criteria: req.body.criteria,
          folloupDateTime: req.body.visitDate,
          remarks: req.body.remark,
        };

        database
          .collection("leadsFollowup")
          .insertOne(leadFollowup)
          .then((result) => {
            // console.log("Plant Added");
          });
      });
  });
});

// Followup details get method

app.get("/followupdetails/:id", (req, res) => {
  var EditId = parseInt(req.params.id);
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("leadsFollowup")
      .find({ leadId: EditId })
      .toArray()
      .then((document) => {
        res.send(document);
        res.end();
      });
  });
});

// After clicking the 'Edit' button, the specific lead data is displayed in the edit form

app.get("/leadscapture/:id", (req, res) => {
  var EditId = parseInt(req.params.id);
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("leadsCapture")
      .find({ id: EditId })
      .toArray()
      .then((document) => {
        res.send(document);
        res.end();
      });
  });
});
app.get("/leadscaptureforedit/:id", (req, res) => {
  var EditId = parseInt(req.params.id);
  mongoose
    .connect(connectionString)
    .then((clientObject) => {
      var database = clientObject.db("Ogha");

      const query1 = database
        .collection("leadsCapture")
        .find({ id: EditId })
        .toArray();
      const query2 = database
        .collection("leadsFollowup")
        .find({ leadId: EditId })
        .toArray();

      Promise.all([query1, query2])
        .then((results) => {
          const [result1, result2] = results;

          const combinedResults = {
            leadsCapture: result1,
            leadsFollowup: result2,
          };

          res.send(combinedResults);
          res.end();
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Internal Server Error");
        })
        .finally(() => {
          // Close the MongoDB connection
          clientObject.close();
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
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

app.put("/updatelead/:id", (req, res) => {
  var id = parseInt(req.params.id);

  mongoose.connect(connectionString).then((clientObject) => {
    var findQuery = { id: id };
    var fiedFollowupQuery = { leadId: id };
    var updateQuery = {
      $set: {
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        emailAddress: req.body.emailAddress,
        jobTitle: req.body.jobTitle,
        address: req.body.address,
        source: req.body.source,
        isInterested: req.body.isInterested,
        folloupDateTime: new Date(req.body.folloupDateTime),
      },
    };

    var folloupDateTime = new Date(req.body.folloupDateTime);

    var updateFollowupQuery = {
      $set: {
        criteria: req.body.isInterested,
        folloupDateTime: folloupDateTime,
        remarks: req.body.remark,
        // CreatedOn: CreatedOn,
        IsActive: 1,
      },
    };
    var database = clientObject.db("Ogha");
    database
      .collection("leadsCapture")
      .updateOne(findQuery, updateQuery)
      .then((result) => {
        console.log("User Updated");
        res.redirect("/leadscapture");
        res.end();
      });

    database
      .collection("leadsFollowup")
      .updateOne(fiedFollowupQuery, updateFollowupQuery)
      .then((result) => {
        console.log("User Updated");
        // res.redirect("/leadscapture");
        res.end();
      });
  });
});

// Update Leads to Walkin on the basis of phone no

app.put("/updateleadstowalkin/:id", (req, res) => {
  var phone = req.params.id;
  var type = req.body.type;
  var remark = req.body.remark;
  var findQuery = { phoneNumber: phone };
  var updateQuery = { $set: { type: type, Remark: remark } };
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("leadsCapture")
      .updateOne(findQuery, updateQuery)
      .then((result) => {
        console.log("Leads updated to Walkin");
      });
  });
});

app.put("/deletelead/:leadid", (req, res) => {
  var id = parseInt(req.params.leadid);

  mongoose.connect(connectionString).then((clientObject) => {
    var findQuery = { id: id };
    var updateQuery = {
      $set: { IsActive: parseInt(req.body.IsActive) }, // , ModifiedBy:req.body.ModifiedBy, ModifiedOn:new Date(req.body.ModifiedOn)
    };
    var database = clientObject.db("Ogha");
    database
      .collection("leadsCapture")
      .updateOne(findQuery, updateQuery)
      .then((result) => {
        console.log("User Updated", id);
        res.end();
      });

    var findLeadId = { leadId: id };
    database
      .collection("leadsFollowup")
      .updateOne(findLeadId, updateQuery)
      .then((result) => {
        console.log("User Updated", id);
        res.end();
      });
  });
});

// Customer Walkin Get Method

app.get("/getWalkinCustomer", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("leadsCapture")
      .find({ IsActive: 1, type: "Walkin" })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

// Customer Walkin Post Method

app.post("/addWalkin", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("leadsCapture")
      .findOne({}, { sort: { id: -1 } })
      .then((lastdocuments) => {
        const lastId = lastdocuments ? lastdocuments.id : 0;
        const newId = lastId + 1;

        const walkinCustomer = {
          id: newId,
          fullName: req.body.name,
          phoneNumber: req.body.phone,
          type: "Walkin",
          emailAddress: req.body.email,
          Remark: req.body.remark,
          CreatedOn: new Date(req.body.CreatedOn),
          CreatedBy: parseInt(req.body.CreatedBy),
          IsActive: 1,
        };

        // database.collection("leadsCapture").insertOne(walkinCustomer).then(result => {
        //   console.log("Walkin Customer Added");
        // })

        database
          .collection("leadsCapture")
          .insertOne(walkinCustomer)
          .then((result) => {
            console.log("Walkin Customer Added");
          });
      });
  });
});

// Edit method for Walkin Customers

app.get("/getWalkinDetails/:id", (req, res) => {
  var id = parseInt(req.params.id);

  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("leadsCapture")
      .find({ id: id })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

// Update method for Walkin Customers

app.put("/updateWalkin/:id", (req, res) => {
  var id = parseInt(req.params.id);

  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    var findQuery = { id: id };
    var updateQuery = {
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

    database
      .collection("leadsCapture")
      .updateOne(findQuery, updateQuery)
      .then((result) => {
        console.log("Walkin Customer Updated");
        res.redirect("/receptionwalkin");
        res.end();
      });
  });
});

// Post Method for Staff

app.post("/addstaff", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("StaffManage")
      .findOne({}, { sort: { id: -1 } })
      .then((lastdocuments) => {
        const lastId = lastdocuments ? lastdocuments.id : 0;
        const newId = lastId + 1;

        const staff = {
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
        };

        database
          .collection("StaffManage")
          .insertOne(staff)
          .then((result) => {
            console.log("Staff Added");
          });
      });
  });
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

app.get("/editstaff/:id", (req, res) => {
  var id = parseInt(req.params.id);

  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("StaffManage")
      .find({ id: id })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

// update method for staff
app.put("/updatestaff/:id", (req, res) => {
  var id = parseInt(req.params.id);

  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    var findQuery = { id: id };
    var updateQuery = {
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
    database
      .collection("StaffManage")
      .updateOne(findQuery, updateQuery)
      .then((result) => {
        console.log("Staff Updated");
        res.redirect("/usermanage");
        res.end();
      });
  });
});

// Delete(Put) method for staff

app.put("/deletestaff/:id", (req, res) => {
  var id = parseInt(req.params.id);

  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    var findQuery = { id: id };
    var updateQuery = { $set: { IsActive: req.body.IsActive } };

    database
      .collection("StaffManage")
      .updateOne(findQuery, updateQuery)
      .then((result) => {
        console.log("Staff Deleted Successfully");
        res.redirect("/usermanage");
        res.end();
      });
  });
});

// Get staff data by user type
app.get("/getStaffData/:type", (req, res) => {
  var type = parseInt(req.params.type);

  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
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

// Get method for package manage

app.get("/getpackages", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("packageManagement")
      .find({ IsActive: 1 })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

// Post method for packages

app.post("/addpackges", async (req, res) => {
  try {
    const clientObject = await mongoose.connect(connectionString);
    const database = clientObject.db("Ogha");

    const lastdocuments = await database
      .collection("packageManagement")
      .findOne({}, { sort: { id: -1 } });
    const lastId = lastdocuments ? lastdocuments.id : 0;
    const newId = lastId + 1;

    const packages = {
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
    };

    const commaSeparatedDescription = convertHtmlDescriptionToCommaSeparated(
      req.body.description
    );
    packages.description = commaSeparatedDescription;

    const result = await database
      .collection("packageManagement")
      .insertOne(packages);
    console.log("Package Added");
    res.redirect("/packagegrid");
  } catch (error) {
    console.error("Error adding package:", error);
    res.status(500).send("Error adding package");
  } finally {
    res.end();
  }
});

// Edit Package Details

app.get("/getPackageDetails/:id", (req, res) => {
  var id = parseInt(req.params.id);
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

//  Update method for package management.

app.put("/updatePackage/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const commaSeparatedDescription = convertHtmlDescriptionToCommaSeparated(
    req.body.description
  );
  const findQuery = { id: id };
  const updateQuery = {
    $set: {
      img: req.body.packageImage,
      packageName: req.body.packageName,
      cost: req.body.packageCost,
      description: commaSeparatedDescription,
      duration: req.body.packageDuration,
      forService: req.body.service,
      modifiedOn: new Date(req.body.createdOn),
      modifiedBy: parseInt(req.body.createdBy),
    },
  };

  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("packageManagement")
      .updateOne(findQuery, updateQuery)
      .then((result) => {
        console.log("Package Updated");
        res.end();
      });
  });
});

// Delete (Put ) method for Package
app.put("/deletePackage/:id", (req, res) => {
  var id = parseInt(req.params.id);

  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    var findQuery = { id: id };
    var updateQuery = { $set: { IsActive: req.body.IsActive } };

    database
      .collection("packageManagement")
      .updateOne(findQuery, updateQuery)
      .then((result) => {
        res.send("Package Deleted Successfully");
        res.redirect("/usermanage");
        res.end();
      });
  });
});

// Display Gym Package
app.get("/getGymPackage", (req, res) => {
  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("packageManagement")
      .find({ forService: "3", IsActive: 1})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

//  Display packages according to category

app.get("/getCategorywisePackage/:type", (req, res) => {
  var type = req.params.type;

  mongoose.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("Ogha");
    database
      .collection("packageManagement")
      .find({ forService: type, IsActive: 1 })
      .toArray()
      .then((documents) => {
        res.send(documents);
      });
  });
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
