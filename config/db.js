const mongoose = require('mongoose');
require('colors');

module.exports = async(server) => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        if (connection) {
            console.log(`mongo connection successful!!`.magenta);
            server.listen(process.env.PORT | 5000, () =>
                console.log(`server running on port ${process.env.PORT}!!`.yellow)
            );
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};