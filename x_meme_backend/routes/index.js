var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// connect to the dtabase
var connection = require('../models');
const PostModel = mongoose.model("Post");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

// Post data to /memes
router.post('/memes', (req, res, next) => {
    let name = req.body.name, url = req.body.url, caption = req.body.caption;

    // throw error if any field is missing
    if(!name || !url || !caption) {
        return next(createError(400, "Fields cannot be empty."));
    }

    // throw error if duplicate data is found else save it to db
    PostModel.find({
        name: name,
        url: url,
        caption: caption
    }, (err, docs) => {
        if(docs.length > 0) {
            return next(createError(409, "Duplicate data found."));
        } else {
            let post = new PostModel();
            post.name = name, post.url = url, post.caption = caption, post.timestamp = new Date();
            post.save((err, doc) => {
                if(!err) {
                    res.json({id: doc._id});
                }
            })
        }
    })
})


// get the latest 100 memes in json format
router.get('/memes', (req, res) => {
    PostModel.find()
    .sort({timestamp: -1})
    .limit(100)
    .exec( (err, docs) => {
        if(!err) {
            // console.log(docs);
            let data = [];
            docs.forEach(doc => {
                let obj = {
                    id: doc._id,
                    name: doc.name,
                    url: doc.url,
                    caption: doc.caption
                };
                data.push(obj);
            });
            res.json(data);
        }
    })
})


// get data of a post with given id
router.get('/memes/:id', (req, res, next) => {
    // create error if id formate is invalid
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(createError(404, "Post with the id does not exist."));
    } else {
        PostModel.findOne({_id: req.params.id})
        .exec( (err, doc) => {
            if(!err) {
                if(!doc) {
                    // create error if data with above id does not exist
                    return next(createError(404, "Post with the id does not exist."));
                } else {
                    let data = {
                        id: doc._id,
                        name: doc.name,
                        url: doc.url,
                        caption: doc.caption,
                    }
                    res.json(data);
                }
            }
        })
    }
})


// patch request to update some of the fields of data
router.patch('/memes/:id', (req, res, next) => {
    let name = req.body.name, url = req.body.url, caption = req.body.caption;
    if(name) {
        return next(createError(400, "Name can't be changed."));
    }
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return next(createError(404, "Post with the id does not exist."));
    } else {
        if(url && caption) {
            PostModel.findOneAndUpdate({_id: req.params.id}, {
                $set: {
                    url: url,
                    caption: caption
                }
            }, (err, doc) => {
                if(!doc) {
                    return next(createError(404, "Post with the id does not exist."));
                } else {
                    console.log(doc);
                    res.send("http status ok");
                }
            })
        } else if(url && !caption) {
            PostModel.findOneAndUpdate({_id: req.params.id}, {
                $set: {
                    url: url
                }
            }, (err, doc) => {
                if(!doc) {
                    return next(createError(404, "Post with the id does not exist."));
                } else {
                    // console.log(doc);
                    res.send("http status ok");
                }
            })
        } else if(!url && caption) {
            PostModel.findOneAndUpdate({_id: req.params.id}, {
                $set: {
                    caption: caption
                }
            }, (err, doc) => {
                // console.log(doc);
                // console.log(err);
                if(!doc) {
                    return next(createError(404, "Post with the id does not exist."));
                } else {
                    console.log(doc);
                    res.send("http status ok");
                }
            })
        } else {
            return next(createError(400, "Input fields can't be empty."));
        }
    }
})

module.exports = router;
