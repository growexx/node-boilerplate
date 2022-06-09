const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseSesTemplate');
const sinon = require('sinon');
const AWS = require('aws-sdk');
const ses = new AWS.SES({ apiVersion: '2010-12-01' ,region: 'us-east-1'});
chai.use(chaiHttp);

describe("Retrieving Template", () => {
    try {
        let sesGetTemplateStub;
        
 
        before(async () => {
            sesGetTemplateStub = sinon.stub(ses, 'getTemplate');
        });
 
        after(async () => {
            sesGetTemplateStub.restore();
        
        });
        TestCase.retrievingtemplate.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .get(`/template/`)
                    .query(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });
        
        it("As a user, I should abe to access existing template", (done) => {
            const template = {
                templateName: "myFile",
            };

            request(process.env.BASE_URL)
                .get(`/template/`)
                .query(template)
                .end((err, res) => {
                    assert.equal(res.statusCode, 200);
                    done();
                });
            
        });
        it("As a user, I should not able to access existing template", (done) => {
            const template = {
                templateName: "myFile",
            };

            request(process.env.BASE_URL)
                .get(`/template/`)
                .query(template)
                .end((err, res) => {
                    assert.equal(res.statusCode, 400);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe("Update Template", () => {
    try {
        let sesUpdateTemplateStub;
        
 
         before(async () => {
        sesUpdateTemplateStub = sinon.stub(ses, 'getTemplate');
 });
 
        after(async ()=> {
            sesUpdateTemplateStub.restore();
        
 });
        TestCase.updatetemplate.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put(`/template/`)
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it("As a user, I should abe to access existing template", (done) => {
            const template = {
                templateName: "myFile",
                subject: "abc",
            };

            request(process.env.BASE_URL)
                .put(`/template/`)
                .send(template)
                .end((err, res) => {
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });
        it("As a user, I should not able to access existing template", (done) => {
            const template = {
                templateName: "myFile",
            };

            request(process.env.BASE_URL)
                .get(`/template/`)
                .query(template)
                .end((err, res) => {
                    assert.equal(res.statusCode, 400);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});
describe("Create Template", () => {
    try {
        let sesCreateTemplateStub;
        
 
         before(async () => {
        sesCreateTemplateStub = sinon.stub(ses, 'getTemplate');
 });
 
        after(async ()=> {
            sesCreateTemplateStub.restore();
        
 });
        TestCase.createtemplate.forEach((data) => {
            it("Template Created ", (done) => {
                request(process.env.BASE_URL)
                    .post(`/template/`)
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it("As a user, I should able to create template", (done) => {
            const template = {
                templateName: "myFile",
                subject: "abc",
            };

            request(process.env.BASE_URL)
                .post("/template/")
                .send(template)
                .end((err, res) => {
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });
        it("As a user, I should not able to create template", (done) => {
            const template = {
                templateName: "myFile",
                subject: "abc",
            };

            request(process.env.BASE_URL)
                .post("/template/")
                .send(template)
                .end((err, res) => {
                    assert.equal(res.statusCode, 400);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});
describe("Delete Template", () => {
    try {
        let sesDeleteTemplateStub;
        
 
         before(async () => {
        sesDeleteTemplateStub = sinon.stub(ses, 'deleteTemplate');
 });
 
        after(async ()=> {
        sesDeleteTemplateStub.restore();
        
 });
        TestCase.deletetemplate.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .delete(`/template/`)
                    .query(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it("As a user, I should able to delete existing template", (done) => {
            sesDeleteTemplateStub.returns();
            const template = {
                templateName: "myFile",
            };

            request(process.env.BASE_URL)
                .delete(`/template/`)
                .query(template)
                .end((err, res) => {
                    console.log(res.body,"TESTING");
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });
        it("As a user, I should not able to delete existing template", (done) => {
            sesDeleteTemplateStub.returns();
            const template = {
                templateName: "myFile",
            };

            request(process.env.BASE_URL)
                .delete(`/template/`)
                .query(template)
                .end((err, res) => {
                    console.log(res.body,"TESTING");
                    assert.equal(res.statusCode, 400);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});
