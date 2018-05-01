

const csv = require('csvtojson')
const fs = require('fs')
const path = require('path')


const convertToJson = (cvsPathFile='customer-data.csv') => {
        const convertData = (cvsFilePath, callback)=>{
            let jsonData = []
            csv()
            .fromFile(cvsPathFile)
            .on('json',(jsonObj)=>{
                jsonData.push(jsonObj) 
            })
            .on('done',(error)=>{
                console.log('Conversion process finished.')
                callback(null, jsonData)
            })
            .on('error', (error)=>{
                callback(error)
            })
        }

        convertData(cvsPathFile, (error, data)=>{
        if (error) {
            console.log('Error: ' + error)
        }
        else
        {
            fs.writeFileSync(path.join(__dirname, 'customer-data.json'),JSON.stringify(data))
            console.log('New Json file saved.')
        }
        global.process.exit(0)
        })
}  

convertToJson(process.argv[2])

