(function() {
	
	var fs = require('fs');
	var md5 = require('md5');
	simplecrypt = {
		encryptStr:function(str, key) {
		  if (key.length == 0) {
			console.log('you must specify password');
			return;
		  }
		  if (str.length == 0) {
			console.log('cannot encode empty str');
			return '';
		  }
		  const PASSWORD = Buffer.from(md5(key));
		  const PLEN = PASSWORD.length;
		  let sign = md5(str);
		  let bufStr = Buffer.from(str);
		  let signbuf = Buffer.from(sign);
		  let strWithSign = Buffer.concat(
			[bufStr, signbuf],
			bufStr.length + signbuf.length
		  );
		  let i = 0;
		  for (; i < strWithSign.length; i++) {
			let pi = i % PLEN;
			strWithSign[i] = strWithSign[i] ^ PASSWORD[pi];
		  }
		  let enstr = strWithSign.toString('base64');
		  return enstr;
		},

		decryptStr:function(str, key) {
		  if (key.length == 0) {
			console.log('you must specify password');
			return '';
		  }
		  if (str.length == 0) {
			console.log('cannot decode empty str');
			return '';
		  }

		  let i = 0;
		  const PASSWORD = Buffer.from(md5(key));

		  const PLEN = PASSWORD.length;
		  let str1 = Buffer.from(str, 'base64');

		  i = 0;
		  for (; i < str1.length; i++) {
			let pi = i % PLEN;
			str1[i] = str1[i] ^ PASSWORD[pi];
		  }
		  let cc = Buffer.alloc(str1.length - 32);
		  let sign = Buffer.alloc(32);
		  str1.copy(cc, 0, 0, cc.length);
		  str1.copy(sign, 0, cc.length, str1.length);
		  if (md5(cc) === sign.toString('ascii')) {
			return cc.toString('utf8');
		  } else {
			console.log('incorrect signature, pls double check your password');
			return '';
		  }
		},
		decryptFile:function(filename, key, outFile = '') {
		  try {
			fs.accessSync(filename, fs.constants.R_OK);
			if (outFile.length == 0) {
			  outFile = filename + '.dec';
			}
			if (key.length == 0) {
			  console.log('you must specify password');
			  return;
			}
			let str = fs.readFileSync(filename, 'ascii');

			let i = 0;
			const PASSWORD = Buffer.from(md5(key));

			const PLEN = PASSWORD.length;
			let str1 = Buffer.from(str, 'base64');

			i = 0;
			for (; i < str1.length; i++) {
			  let pi = i % PLEN;
			  str1[i] = str1[i] ^ PASSWORD[pi];
			}
			let cc = Buffer.alloc(str1.length - 32);
			let sign = Buffer.alloc(32);
			str1.copy(cc, 0, 0, cc.length);
			str1.copy(sign, 0, cc.length, str1.length);
			if (md5(cc) === sign.toString('ascii')) {
			  fs.writeFileSync(outFile, cc.toString('utf8'));
			  return outFile;
			} else {
			  console.log('incorrect signature, pls double check your password');
			}
		  } catch (err) {
			console.error(err);
		  }
		},
		encryptFile:function(filename, key, outFile = '') {
		  try {
			fs.accessSync(filename, fs.constants.R_OK);
			let str = fs.readFileSync(filename);
			if (outFile.length == 0) {
			  outFile = filename + '.enc';
			}
			if (key.length == 0) {
			  console.log('you must specify password');
			  return;
			}
			const PASSWORD = Buffer.from(md5(key));
			const PLEN = PASSWORD.length;
			let sign = md5(str);
			let signbuf = Buffer.from(sign);
			let strWithSign = Buffer.concat(
			  [str, signbuf],
			  str.length + signbuf.length
			);
			let i = 0;
			for (; i < strWithSign.length; i++) {
			  let pi = i % PLEN;
			  strWithSign[i] = strWithSign[i] ^ PASSWORD[pi];
			}

			let enstr = strWithSign.toString('base64');
			fs.writeFileSync(outFile, enstr);
			return outFile;
		  } catch (err) {
			console.error(err);
		  }
		}
	}
  module.exports = simplecrypt;
})();