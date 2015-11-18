# Milestone: DEPLOYMENT

### Team Members
1. Kumar Utsav (kutsav)
2. Raman Preet Singh (rpsingh2)
3. Rohit Arora (rarora4)

### Description

We are using the following node js project as our target project: 
```
https://github.com/DevOps-HeadBangers/Milestone3TargetApp.git
```

We have 3 droplets for this milestone:

Droplet 1: It runs Jenkins build server, redis global server, and the proxy server.

Droplet 2: It is the stable production server.

Droplet 3: It is the canary server.

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
   The above command will consume the inventory file and use the rules in playbook.yml to automatically provision the server.
   
   ![Capability 1](https://github.com/DevOps-HeadBangers/Milestone3/blob/master/images/cap1.gif) 

#### The ability to deploy software to the production environment triggered after build, testing, and analysis stage is completed. The deployment needs to occur on actual remote machine/VM (e.g. AWS, droplet, VCL), and not a local VM.

For this task, we have setup a new Droplet which will run the Jenkins build server and the redis global. This droplet will also run the proxy server got the task 5.

Public ssh key of this droplet is added to the ```authorized_keys``` of the Stable Server so that Jenkins can ssh into it to deploy the latest code.

We have used Jenkins Github Service to add a webhook to the repo so that whenever a push is made to the app repo, the code will be built, tested, analysed and deployed to the production server.

Build, test and analysis is done similar to Milestone 2. The logic to deploy is in the ```deploy.sh``` script which is executed as a part of the Execute Script part of Jenkins build.

![Capability 2](https://github.com/DevOps-HeadBangers/Milestone3/blob/master/images/cap2.gif) 

#### The ability to use feature flags, serviced by a global redis store, to toggle functionality of a deployed feature in production.
1. Our application send email to a registered email id by default whenever there is a new image upload. However, this feature can be turned ON and OFF based on Key-value (Key is M3_EMAIL) stored in global Redis Store.

2. To toggle this functionality OFF, go to console (assuming you have Redis installed) and type the following:
```
redis-cli
>>> SET M3_EMAIL No
```

3. Similarly, to turn this feature off, go to console (assuming you have Redis installed) and type the following:
```
redis-cli
>>> SET M3_EMAIL Yes
```
![Capability 3](https://github.com/DevOps-HeadBangers/Milestone3/blob/master/images/cap3.gif) 

#### The ability to monitor the deployed application (using at least 2 metrics) and send alerts using email or SMS (e.g., smtp, mandrill, twilio). An alert can be sent based on some predefined rule.

1. The application has 2 monitoring criterias (using socket.io): ```Number of Uploads``` and ```Highest Upload Size```, to see this metric (it updates automatialy) go to:
   ```
   <stable_server_ip>:3000/monitor
   ```

2. Try uploading a new file at <stable_server_ip>: 3000 and see this metric changing.

3. For SMS based alerts you are required to setup a [Twilio account](https://www.twilio.com/). Upon regiestration get a Twilio phone number. After getting the phone number click on **Show API Credentials**. Make note of ACCOUNT SID and AUTH TOKEN.

4. Save following enviornment variables: ACCOUNT SID as TWILIO_SID, AUTH TOKEN as TWILIO_TOKEN, your new TWILIO number as MY_TWILIO_NO. You can also store receiver's phone number as enviornment variable with the name MY_PHONE_NO.

5. SMS alerts are sent on two occasions:
	* We are assuming the max storage capacity of our application (for alert purpose) is 10MB, if storage reaches 80% of this capacity SMS alert is sent to the receiver(MY_PHONE_NO).
	* Another instance when SMS alerts are sent is when there are uploads greater 1MB under a minutes timeframe.  

![Capability 4](https://github.com/DevOps-HeadBangers/Milestone3/blob/master/images/cap4.gif) 

![Capability 4 Alert](https://github.com/DevOps-HeadBangers/Milestone3/blob/master/images/cap4_alert.PNG) 

#### The ability to perform a canary release: Using a proxy/load balancer server, route a percentage of traffic to a newly staged version of software and remaining traffic to a stable version of software. Stop routing traffic to canary if alert is raised.

1. Run proxy server (from directory Milestone3) and Canary Server from the Project App directory (do provide port number) and make sure stable version is also working:
   ```
   node server.js
   node server-canary.js
   node proxy-server.js
   ```

2. Open to proxy server in multiple tabs (6-7):
   ```
   localhost:5050
   ```
   Notice console redirection messages, some of them will go to CANARY and some to STABLE. Also, notice that traffic with numbers 8,9,10 goes to canary and number 1-7 goes to stable this is illustration purpose only. 70% traffic is for STABLE and 30% is for CANARY. CANARY or STABLE server are chosen randomly with 30-70 ratio.

3. Now go to any one of the open ```localhost:5050``` and upload many file images more totaling more than 8 MB. You will receive the SMS alert as mentioned in above property from CANARY, also the CONSOLE will say **Canary Server Failed** However, if you open a 6-7 more proxy servers in new tab (localhost:5050), you will notice that all the traffic is now directed to STABLE server irrespective of number 1-5.



