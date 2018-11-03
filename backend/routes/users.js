var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var config = require("../config");
var multer = require('multer');

var fileFilter = (req,file, cb) => {
  //reject a file
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null,true);
  }else{
    cb(null, false);
  }
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
    let fname= Date.now()+'_'+ file.originalname;
    req.body.company_logo=fname;
    cb(null, fname);
  }
});

var upload = multer({ storage: storage, fileFilter: fileFilter }).single('file');


var job = require("../models/Job");
var admin = require("../models/Admin");


/* GET ALL JOBS */
router.get('/', function (req, res, next) {
  job.find(function (err, job) {
    if (err) return next(err);
    res.json(job);
  });
});
/* GET SINGLE JOB BY ID */
router.get('/:id', function (req, res, next) {
  job.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//admin signup
router.post('/admin-signup', function (req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  admin.create({
    admin_name: req.body.admin_name,
    email: req.body.email,
    password: hashedPassword
  },
    function (err, admin) {
      if (err) return res.status(500).send("There was a problem registering the admin.")
      // create a token
      var token = jwt.sign({ id: admin._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    });
});


//admin signin
router.post('/login', function (req, res) {
  admin.findOne({ email: req.body.email }, function (err, admin) {
    if (err) return res.status(500).send('Error on the server.');
    if (!admin) return res.status(404).send('No admin found.');
    var passwordIsValid = bcrypt.compareSync(req.body.password, admin.password);
    if (!passwordIsValid) return res.status(401).send('Password is not valid.');
    var token = jwt.sign({ id: admin._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
});

//get token
router.get('/getUser/me', function (req, res) {
  var token = req.get('x-access-token');
  if (!token)
    return res.status(403).json({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    console.log(decoded);
    admin.findById(decoded.id, { password: 0 }, function(err, admin) {
      if (err) return res
          .status(500)
          .send("There was a problem finding the admin.");
      if (!admin) return res.status(404).send("No admin found.");
      // res.status(200).send(admin);
      next();
    });
  });
});


// middleware function
router.use(function (admin, req, res, next) {
  res.status(200).send(admin);
});

/* CREATE JOB */
router.post('/add', function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.json({ status: 500, message:err});
    }
    next();
  })
}, function (req, res, next) {
  job.create(req.body,
    function(err, post) {
      if (err) return res.json({ status: 500, message: err });
      res.json(post);
    }
  );
});

/* UPDATE JOB */
router.put("/:id", function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.json({ status: 500, message: err });
    }
    next();
  })
}, function(req, res, next) {
  job.findByIdAndUpdate(
    req.params.id,
    req.body,
    function(err, post) {
      if (err) return next(err);
      res.json(post);
    }
  );
});

/* DELETE JOB */
router.delete('/:id', function (req, res, next) {
  job.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;
