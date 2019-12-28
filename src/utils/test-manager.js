const testQuery = (results, request) => {
    const expect = require('chai').expect;
    if (request.tests) {
        eval(request.tests);
    }
};

export default testQuery;