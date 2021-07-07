 import { createCipheriv, createDecipheriv }  from 'crypto';

 const encoding = 'hex';
 const algorithm = process.env.SALT_ENCRYPTION_ALG;
 const key = Buffer.from(process.env.SALT_ENCRYPTION_KEY, encoding);
 const iv =Buffer.from(process.env.SALT_ENCRYPTION_IV, encoding);




export const encrypt = (value) => {
  const cipher = createCipheriv(algorithm, key , iv );

  let encrypted = cipher.update(value, encoding, encoding);
  encrypted += cipher.final(encoding);
  return(encrypted);
};

export const decrypt = (encrypted) => {
  const decipher = createDecipheriv(algorithm, key, iv);

  // Encrypted using same algorithm, key and iv.
  let decrypted = decipher.update(encrypted, encoding, encoding);
  decrypted += decipher.final(encoding);
  return decrypted;
};