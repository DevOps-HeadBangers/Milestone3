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

2. Try uploading a new file at localhost 3000 and see this metric changing.

3. For SMS based alerts you are required to setup a [Twilio account](https://www.twilio.com/). Upon regiestration get a Twilio phone number. After getting the phone number click on **Show API Credentials**. Make note of ACCOUNT SID and AUTH TOKEN.

4. Save following enviornment variables: ACCOUNT SID as TWILIO_SID, AUTH TOKEN as TWILIO_TOKEN, your new TWILIO number as MY_TWILIO_NO. You can also store receiver's phone number as enviornment variable with the name MY_PHONE_NO.

5. SMS alerts are sent on two occasions:
	* We are assuming the max storage capacity of our application (for alert purpose) is 10MB, if storage reaches 80% of this capacity SMS alert is sent to the receiver(MY_PHONE_NO).
	* Another instance when SMS alerts are sent is when there are uploads greater 1MB under a minutes timeframe.  


#### The ability to perform a canary release: Using a proxy/load balancer server, route a percentage of traffic to a newly staged version of software and remaining traffic to a stable version of software. Stop routing traffic to canary if alert is raised.

1. Run proxy server (from directory Milestone3):
   ```
   node proxy-server.js
   ```

2. Open to proxy server in multiple tabs (6-7):
   ```
   localhost:5050
   ```
   Notice console redirection messages, some of them will go to CANARY and some to STABLE. Also, notice that traffic with numbers 4 & 5 goes to canary and number 1-3 goes to stable this is illustration purpose only. 60% traffic is for STABLE and 40% is for CANARY.

3. Now go to any one of the open ```localhost:5050``` and upload file many file images more totaling more than 8 MB. You will receive the SMS alert as mentioned in above property from CANARY, also the CONSOLE will say **Canary Server Failed** However, if you open a 6-7 more proxy servers in new tab (localhost:5050), you will notice that all the traffic is now directed to STABLE server irrespective of number 1-5.



