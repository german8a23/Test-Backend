export const renameImage = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileName = file.originalname;
    const randonName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

    console.log(`${name}-${randonName}${fileName}`);
    callback(null, `${name}-${randonName}${fileName}`);
}

export const fileFilter = (req, file, callback) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback( new Error('Invalid format type'), false)
    }
    callback(null, true);
}