import * as express from "express";
import * as fs from 'fs';

export const register = ( app: express.Application ) => {
    const config = {
        file_path_input: process.env.FILE_PATH_INPUT || "",
        file_path_output: process.env.FILE_PATH_OUTPUT || ""
    };
    // To read a file
    app.get( '/api/performances', async ( req: any, res ) => {
        try {
            fs.readFile(config.file_path_input, "utf8", (err, data) => {

                // Check for errors
                if (err) throw err;
                return res.json(JSON.parse(data));
            });
        } catch ( err ) {
            res.json( { error: err.message || err } );
        }
    });

    // To write to the file
    app.post( '/api/performances/update', async ( req: any, res ) => {
        try {
            // res.json(req.body);
            fs.writeFile(config.file_path_output, JSON.stringify(req.body), { flag: 'w+' }, err => {
                if (err) {
                    return err;
                }

                // file written successfully
                res.json({"message": "successfully"});
            })
        } catch ( err ) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json( { error: err.message || err } );
        }
    } );

};