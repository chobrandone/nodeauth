const crypto=require('crypto')
const express=require('express');
const app=express()
exports.getHashPassword=(password)=>{
    const sha256=crypto.createHash('sha256');
    const hash=sha256.update(password).digest("base64");
    return hash;
 
};

