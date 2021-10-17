import * as express from "express";
import * as api from "./api";

export const register = ( app: express.Application ) => {

    // define a route handler for the default home page
    app.get( "/", ( req: any, res ) => {
        res.render( "index" );
    } );

    // define a secure route handler for the performances page
    app.get( "/performances", ( req: any, res ) => {
        res.render( "performances" );
    } );

    api.register( app );
};