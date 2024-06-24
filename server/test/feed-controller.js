const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const FeedController = require('../controllers/feed');

describe('Feed Controller', function () {
    before(function (done) {
        mongoose
            .connect(
                'mongodb+srv://binaro97:7kYHbTN6C3aYrZMr@cluster0.4v5prio.mongodb.net/test-messages?retryWrites=true&w=majority&appName=Cluster0',
                { useNewUrlParser: true, useUnifiedTopology: true }
            )
            .then(() => {
                const user = new User({
                    email: 't1@test.com',
                    password: '1234',
                    name: 'Bina',
                    posts: [],
                    _id: '6673bc589eca2c04ed3a1ed6'
                });
                return user.save();
            })
            .then(() => {
                done();
            })
            .catch(err => {
                console.error('MongoDB connection error:', err);
                done(err);
            });
    });

    beforeEach(function () { });

    afterEach(function () {
        sinon.restore();
    });

    it('should add a created post to the posts of the creator', function (done) {
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        const req = {
            body: {
                title: 'Test Post',
                content: 'A Test Post'
            },
            file: {
                path: 'abc'
            },
            userId: '6673bc589eca2c04ed3a1ed6'

        };
        const res = {
            status: function () {
                return this
            },
            json: function () {}
        }
        FeedController.createPost(req, res, () => { }).then((savedUser) => {
            expect(savedUser).to.have.property('posts');
            expect(savedUser.posts).to.have.length(1);
            done();
        }).catch(err => done(err));
    });

    after(function (done) {
        User.deleteMany({})
            .then(() => {
                return mongoose.disconnect();
            })
            .then(() => {
                done();
            })
            .catch(err => {
                console.error('Error cleaning up:', err);
                done(err);
            });
    });
});
