# Supplemental data from OuterSpatial

Certain data displayed for each park, comes from OuterSpatial's API. This provides supplemental data such as events and alerts. Not all parks contain such supplemental data.


## Data Table and Format

The `getSelectedPark()` query, will also check the **outerspatial_content** table to provide supplemental data. If the park is not listed, then blank values will be provided.

* *cpad_suid* -- The CPAD Superunit ID (SUID_NMA). Managed manually, see below.
* *os_id* -- The OuterSpatial ID. Managed manually, see below.
* *unit_name* -- A name for this park. Managed manually, see below. *Not really used* by the programming but serves as a reference when examining the table.
* *lastupdate* -- The date and time when this record was last updated. Useful for debugging the scheduler.
* *aboutvisiting* -- HTML text, About Visiting. Titles and paragraphs, about park rules, fees, hours, etc.
* *events* -- HTML text, About Visiting. Titles and paragraphs, about park rules, fees, hours, etc.
* GDA TBD content blocks?
* GDA TBD images plural?

The HTML fields above are composed from OuterSpatial content, much of which is pre-formatted and used as-given. Content management is by OpenSpatial personnel and is considered trustworthy, e.g. wrapping a title in <h1></h1> will not result in a broken tag nor anything ugly and displaying their HTML as-given would not introduce a <script> tag nor onMouseOver="" attributes. *If OuterSpatial changes their policies on data hygiene and public contribution, this may need to be revisited* so as not to introduce script-injection, broken HTML, etc. into Caliparks.



## OuterSpatial Scheduler

The **outerspatial_content** table is updated by a daily scheduled task, running on a Heroku Scheduler.

This calls the `` task. You may manually run the scheduler at any time by calling this same task:
```
cd app
npm run outerspatial_parkdetails
```

This scheduled uses the following environment variables loaded from `.env`. Appropriate values for them are in 1Password.
* *OPENSPATIAL_CLIENT_ID* -- OAuth2 client ID.
* *OPENSPATIAL_CLIENT_SECRET* -- OAuth2 client secret.
* *DATABASE_URL* -- DB credentials URL string, same as used by the rest of the application.


## Adding / Removing Parks as Candidates for OuterSpatial Content

The scheduled task will iterate over every park listed in the **outerspatial_content** table. As such, management of what parks will have OuterSpatial supplemental data, is literally as simple as INSERTing a new park to be scanned, or else DELETEing a park to remove it from scanning.

```
-- at the next scheduler run, this new park would automatically be picked up and updated
INSERT INTO outerspatial_content (unit_name, os_id, cpad_suid) VALUES ('My New State Beach', 123454321, 9876543);

-- parks which no longer exist in CPAD and/or no longer exist at OuterSpatial, should be cleaned up
DELETE FROM outerspatial_content WHERE cpad_suid = 9876543;
```

After adding a new park to the list, you probably want to run the scheduled task right away, so as to bring in the OuterSpatial information for that park. Or, you could just wait for the next scheduled run.
