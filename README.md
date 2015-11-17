# Milestone: DEPLOYMENT

### Properties

#### The ability to configure a production environment *automatically*, using a configuration management tool, such as ansible, or configured using docker.

1. Setup digital ocean account and ansible using the steps provided [here](https://github.com/kumar-utsav/HW/blob/master/HW1/README.md).

2. Go to Milestone3 directory. Run ``` npm install ``` to install all the dependencies needed for the execution of the node script. 

3. Run the following command:
   ```
   node createDroplet.js <droplet_name> <droplet_region> <droplet_image>
   ```  
   The above command will run a node script which will create a droplet on Digital Ocean. The IP addresses of the server will be fetched and will be written along with other info regarding the server on the inventory file.

4. Wait for a minute or so, to run the Ansible command since the server take some time to get active and ready to be provisioned.

5. Now, to provision the server using Ansible, run the following command:
   ```
   ansible-playbook -i inventory playbook.yml
   ```
   The above command will consume the inventory file and use the rules in playbook.yml to provision the server.

#### The ability to deploy software to the production environment triggered after build, testing, and analysis stage is completed. The deployment needs to occur on actual remote machine/VM (e.g. AWS, droplet, VCL), and not a local VM.

#### The ability to monitor the deployed application (using at least 2 metrics) and send alerts using email or SMS (e.g., smtp, mandrill, twilio). An alert can be sent based on some predefined rule.

1. The application has 2 monitoring criterias (using socket.io): ```Number of Uploads``` and ```Highest Upload Size```, to see this metric (it updates automatialy) go to:
```
localhost:4005
```
Try uploading a new file and see this metric changing.

2. For SMS based alerts you are required to setup a [Twilio account](https://www.twilio.com/). Upon regiestration get a Twilio phone number. After getting the phone number click on ~Show API Credentials~. Make note of ACCOUNT SID and AUTH TOKEN.

3. Save following enviornment variables: ACCOUNT SID as TWILIO_SID, AUTH TOKEN as TWILIO_TOKEN, your new TWILIO number as MY_TWILIO_NO. You can also store receiver's phone number as enviornment variable with the name MY_PHONE_NO.

4. SMS alerts are sent on two occasions:
	* We are assuming the max storage capacity of our application (for alert purpose) is 10MB, if storage reaches 80% of this capacity SMS alert is sent to the receiver(MY_PHONE_NO).
	* Another instance when SMS alerts are sent is when there are uploads greater 1MB under a minutes timeframe.  



