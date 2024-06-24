// import { expect } from 'chai';
// import jwt from 'jsonwebtoken'
// import sinon from 'sinon'
// import authMiddleware from '../middleware/is-auth.js';

// describe('Auth middleware', function(){
//   it('should throw an error if no authorization header is present', function () {
//     const req = {
//       get: function (headerName) {
//         return null;
//       },
//     };
//     expect(() => authMiddleware( req, {}, () => {})).to.throw('Not authenticated.');
//   });

//   it('should throw an error if the authorization header is only one staring', function () {
//     const req = {
//       get: function (headerName) {
//         return 'xyz';
//       },
//     };
//     expect(() => authMiddleware( req, {}, () => {})).to.throw();
//   });

//   it('should throw an error if the token connot be verified', function () {
//     const req = {
//       get: function (headerName) {
//         return 'Bearer xyz';
//       },
//     };
//     expect(() => authMiddleware( req, {}, () => {})).to.throw();
//   });

//   it('should yield a userId after decoding the token', function () {
//     const req = {
//       get: function (headerName) {
//         return 'Bearer djffdvdjkfdfgffd';
//       },
//     };
//     sinon.stub(jwt, 'verify')
//     jwt.verify.returns({userId: 'abc'})
//     // jwt.verify = function(){
//     //     return {userId: 'abc'}
//     // }
//     authMiddleware(req, {}, ()=>{})
//     expect(req).to.have.property('userId');
//     expect(req).to.have.property('userId', 'abc')
//     expect(jwt.verify.called).to.be.true
//     jwt.verify.restore()
//   });
// })