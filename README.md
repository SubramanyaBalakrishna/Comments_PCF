
Comments PCF is a PowerApps Component Framework (PCF) component that utilizes Fluent UI styles to render custom comments in conversation format within Model Driven Apps

**Feature**

The main purpose of this component is to present tabular data in a conversational format and minimize the number of clicks required to add new data to the table.

Users can enter data into the comment box, press the Enter key, and the control will identify the user who made the comment and the timestamp, associating the comment with the parent record.

**Default Sub grid user interface**

![image](https://github.com/SubramanyaBalakrishna/Comments_PCF/assets/165458063/9a02cf9a-af4f-4a0a-8a13-d63be281da16)


**Comments User Interface**

![image](https://github.com/SubramanyaBalakrishna/Comments_PCF/assets/165458063/541b4812-24d1-4c46-aad5-144ad2b7cefc)


**Installation**

To install Comments PCF:

-   Download the managed solution from [Releases](https://github.com/SubramanyaBalakrishna/Comments_PCF/releases) section.
-   Import the solution into your environment via [Power Apps Maker](https://make.powerapps.com/).

**Component Configurable options:**

The following options are available for configuration:

| **Option**           | **Description**                                      |
|----------------------|------------------------------------------------------|
| MessageProperty      | Schema Name of table column for Message              |
| DateProperty         | Schema Name of table column for date column          |
| UserProperty         | Schema Name of table column for user column          |
| ParentLookUpProperty | Schema Name of table column for parent lookup column |

![](media/66ee1e1256dbcb8eb8eb027ddad2f9ef.png)

**Contribute**

Contributions are welcome! Feel free to submit a pull request with your enhancements or bug fixes.

**Disclaimer**

THIS CODE IS PROVIDED AS IS WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.
