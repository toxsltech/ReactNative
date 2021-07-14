## These are the points to be included and should be checked before releasing a project:

**Security Checklist**

* [ ]  1. MOD Rewrite check
* [ ]  2. Check Access Rules
* [ ]  3. Add verb filter `No Deletion using GET method`
* [ ]  4. Password Strong Validation
* [ ]  6. Enable csrf.
* [ ]  7. Cross access Test `Test seperate roles`
* [ ]  8. Download Action `query string should have random key or timestamp`

**Components**

* [ ]  1. Use `deleteRelatedAll()` function in `beforeDelete()`

**Database**
* [ ]  1. Database Auto Backups

**Initialization Defaults**

* [ ]  1. cookieValidationKey, id, name'cookieValidationKey' => 'YourProjectNameIdKEY',
* [ ]  2. Change project NAME from package.json
* [ ]  3  Change package.json package name and description same as your project


**MOD ReWrite**

* [ ]  1. URL Manager Pretty Url's
* [ ]  2. www. and without www should be merge RewriteCond %{HTTP_HOST} ^www\.(.+) [NC]
* [ ]  3  Check htaccess Rules

**WaterMarks and Copyrights**

* [ ]  1. Schema `<img alt = "YourTitleHere"/> , <a href = "mailto:yourmail@toxsltech.com">`
* [ ]  2. Companies details never be deleted from the code.
* [ ]  3. Copyrights should be available in the footer (Never delete source code)
©2020 ToXSL Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com

**Extras**

* [ ]  1. Log error to Admin
* [ ]  2. Send Email to Admin on Register of User
* [ ]  3. Remove Commented Code
* [ ]  4. Remove Extra Files/Folders
* [ ]  5. No folder should be created in the root except themes,protected,docs and assets
* [ ]  6. Login History,Email Queue,Admin settings
* [ ]  7. Login error count
* [ ]  8. Remove css and js libraries if not required.

# Common

    - Clean and separate routing.
    - Declare secret keys in .env files.
    - Make a global function for error handling of callbacks.
    - Make separate folder (example: utils) for constant files and other reusables.
    - No hard codes.
    - Password Strong Validation
    - Remove consoles
    - Remove Commented Code
    - Remove Extra Files/modules and uninstall unused modules
    - Tokenization.
    - Use ‘use strict’.
    - Use same formator for backend and frontend (eg. Prettier)
    - 404 and 400 should not be there
    - remove unwanted or unsed file/images (fs.unlink()),related data,thumbnails

# Frontend

    - Remove css and js libraries if not required.
    - Use guard for front end to prevent access by non-authorized user ( front end).
    - URL Manager.
    - Use lazy loading for modules

# Backend

    - Log error to Admin.
    - Database Backup.
    - Schema.
    - Validations with schema.
