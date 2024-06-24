const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const AuthController = require('../controllers/auth');

describe('Auth Controller', function () {
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

    it('should throw an error with code 500 if accessing the database fails', function (done) {
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        const req = {
            body: {
                email: 't1@test.com',
                password: '1234'
            }
        };

        AuthController.login(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result.statusCode).to.equal(500);
            done();
        }).catch(err => done(err));
    });

    it('should send a response with a valid user status for an existing user', function (done) {
        const req = { userId: '6673bc589eca2c04ed3a1ed6' };
        const res = {
            statusCode: 500,
            userStatus: null,
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.userStatus = data.status;
            }
        };

        AuthController.getUserStatus(req, res, () => { })
            .then(() => {
                expect(res.statusCode).to.equal(200);
                expect(res.userStatus).to.equal('I am new!');
                done()
            })
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
