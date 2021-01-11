## simcrypt
a simple crypter using xor and md5
##usage
###encrypt string
```
simc enc  'string to encrypt'
please enter password: [hidden] encryptkey
please enter password: **********
[OK]
RUAWDVwERBcMEQNbVURLQxBbCA8EBFEHVwBWDg0NUwkAUlZWBlMAAVUGVAMFD1RRUQ==

```

### decrypt string
```
simc dec 'RUAWDVwERBcMEQNbVURLQxBbCA8EBFEHVwBWDg0NUwkAUlZWBlMAAVUGVAMFD1RRUQ=='
please enter password: [hidden] encryptkey
please enter password: **********
[OK]
string to encrypt
```

### encrypt file
```
simc ef package.json
overwrite package.json.enc? (Y/n) y
overwrite package.json.enc? Yes
please enter password: [hidden] encryptkey
please enter password: **********
[OK]
package.json.enc

```

### decrypt file
```
simc df package.json.enc
overwrite package.json.enc.dec? (Y/n) y
overwrite package.json.enc.dec? Yes
please enter password: [hidden] encryptkey
please enter password: **********
[OK]
package.json.enc.dec
```
### diff verify
diff package.json package.json.enc.dec

