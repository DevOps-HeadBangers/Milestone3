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

##### The ability to deploy software to the production environment triggered after build, testing, and analysis stage is completed. The deployment needs to occur on actual remote machine/VM (e.g. AWS, droplet, VCL), and not a local VM.



