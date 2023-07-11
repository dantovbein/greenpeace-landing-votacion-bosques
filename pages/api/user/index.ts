import { NextApiRequest, NextApiResponse } from "next";
import moment from 'moment';

const fs = require('fs');
const path = require('path');

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  if(request.method === 'POST') {
    type BodyType = {
      email: string;
      firstName: string;
      lastName: string;
      docNumber: string;
      phoneNumber: string;
      city: string;
      answer: string;
      userAgent: string;
    };

    const body = request.body as BodyType;

    const now = new Date();
    moment().format();   

    fs.appendFile(
      path.resolve('pages/api', 'users.csv'),
      `${ moment().format()},${body.email},${body.firstName},${body.lastName},${body.docNumber},${body.phoneNumber},${body.city},${body.answer},${body.userAgent},\n`, 
      (error: any) => {
        if(error) {
          return response.status(404).json({ error });;
        } else {
          return response.status(201).json({ result: { message: 'Updated.', statusCode: response.statusCode } });
        }
      });
  } else {
    // Open the file, and read it
    var fileData = fs.readFileSync(path.resolve('pages/api', 'users.csv')).toLocaleString();
    var header = fileData.split("\n")[0].split(',');
    let data:Array<any> = fileData.split("\n").map((row: string, index: number) => {
      if(index > 0) {
        const column = row.split(",");
        if(column.length > 1) {
          return {
            createdAt: column[0],
            email: column[1],
            firstName: column[2],
            lastName: column[3],
            docNumber: column[4],
            phoneNumber: column[5],
            city: column[6],
            answer: column[7],
            userAgent: column[8],
          }
        }
      }
    }).filter((row: any) => row !== undefined);

    response.status(200).json({ data });
  }
}
