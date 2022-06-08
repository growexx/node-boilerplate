const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const assert = chai.assert;
const request = require("supertest");
const TestCase = require("./testcaseSesTemplate");
chai.use(chaiHttp);

describe("Retrieving Template", () => {
    try {
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

        it("As a user, I should verify existing template", (done) => {
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

        it("As a user, I should verify existing template", (done) => {
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
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});
describe("Create Template", () => {
    try {
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

        it("As a user, I should verify existing template", (done) => {
            const template = {
                templateName: "myFile",
            };

            request(process.env.BASE_URL)
                .delete(`/template/`)
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
