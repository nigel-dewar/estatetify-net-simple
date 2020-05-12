<template>
    <div class="upload-body">
        <b-container>
           
            <h1>Dam Safety Upload Portal</h1>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">

                <!-- <b-form-file
                    v-model="file"
                    :state="Boolean(file)"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                    ></b-form-file> -->
                
            
                <b-form-group id="dam-name-group" label="Dam Name:" label-for="dam-name"  description="Please enter Dam name" label-class="font-weight-bold pt-0">
                    <b-form-input
                        id="dam-name"
                        v-model="form.damName"
                        type="text"
                        required
                        placeholder="Enter Dam name"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="organisation-group" label="Organisation:" label-for="organisation" description="If applicable" label-class="font-weight-bold pt-0">
                    <b-form-input
                        id="organisation"
                        v-model="form.organisation"
                        placeholder="Enter Organisation"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="submitter-name-group" label="Submitter Name:" label-for="" description="" label-class="font-weight-bold pt-0">
                    <b-row>
                        <b-col>
                            <b-form-input
                                id="firstName"
                                v-model="form.firstName"
                                placeholder="Enter First Name">
                            </b-form-input>
                        </b-col>
                        <b-col>
                            <b-form-input
                                id="lastName"
                                v-model="form.lastName"
                                placeholder="Enter Last Name">
                            </b-form-input>
                        </b-col>
                    </b-row>

                </b-form-group>

                <b-form-group id="submitter-email-group" label="Submitter Email:" label-for="organisation" description="example@example.com" label-class="font-weight-bold pt-0">
                    <b-form-input
                        id="email"
                        v-model="form.email"
                        placeholder="Enter Email"
                    ></b-form-input>
                </b-form-group>
            
                <b-form-group id="attention-group" label="For the attention of (Department Dam Safety Contact):" label-for="attention" description="If known" label-class="font-weight-bold pt-0">
                    <b-form-input
                        id="attention"
                        v-model="form.attention"
                        placeholder=""
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="submission-type-group" label="Document Type:" label-for="submission-type" description="" label-class="font-weight-bold pt-0">
                    <b-form-select
                        id="submission-type"
                        v-model="form.submissionType"
                        :options="submissionTypes"
                        required
                        @change="onSubmissionTypeChanged"
                    ></b-form-select>
                </b-form-group>

                <!-- options section     -->
                <div>

                    <b-card v-if="form.submissionType != null" bg-variant="light">
                        <b-form-group label="Emergency Action Plan Submission Confirmation" label-class="font-weight-bold pt-0">
                            <b-form-checkbox-group
                                v-model="selectedCheckBoxes"
                                :options="filteredCheckBoxOptions"
                                name=""
                                stacked
                                @changed="onCheckBoxesSelected"
                            ></b-form-checkbox-group>
                        </b-form-group>
                    </b-card>

                </div>

  

                <b-form-group id="input-group-4">
                    <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
                    <b-form-checkbox value="me">Check me out</b-form-checkbox>
                    <b-form-checkbox value="that">Check that out</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>

                <AttachmentsComponent />

                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
           
        </b-container>  
        
    </div>
</template>

<script>
// import AttachmentService from '../api/attachment.service';
import AttachmentsComponent from '../components/attachments/AttachmentsComponent.vue';

  export default {
    name: 'UploadPage',
    components: {
        AttachmentsComponent
    },
    data() {
      return {
        form: {
          damName: '',
          name: '',
          submissionType: null,
          checked: [],
          firstName: '',
          lastName: '',
          email: ''
        },
        submissionTypes: [
            { text: 'Select One', value: null },
            { text: 'Emergency Action Plan', value: 1 },
            { text: 'Failure Impact Assessment', value: 2 },
            { text: 'Annual Inspection Report', value: 3 },
            { text: 'Comprehensive Insection Report', value: 4 },
            { text: 'Acceptable Flood Capacity Report', value: 5 },
            { text: 'Emergency Event Report', value: 6 },
            { text: 'Safety Review', value: 7 },
            { text: 'Instrumentation Report', value: 8 },
            { text: 'Operating and Maintenance Manuals', value: 9 },
            { text: 'Data Book', value: 10 },
            { text: 'Standard Operating Procedures', value: 11 },
            { text: 'Design Report', value: 12 },
            { text: 'Contruction Report', value: 13 },
            { text: 'As-constructed Drawings', value: 14 },
            { text: 'Special Inspection Report', value: 15 },
            { text: 'Decommissioning Report', value: 16 },
            { text: 'Other', value: 17 }
        ],
        submissionCheckBoxOptions: [
            { text: 'The assessment has been prepared in conjuction with Department EAP guidelines', value: '1' },
            { text: 'A copy of the EAP has been provided to the relevant local government and disaster management groups', value: '2' },
            { text: 'The relevant written notices from local governments and district disaster management group have been attached', value: '3' },
            { text: 'The plan identifies a range of dam hazards, dam failure modes, dam hard events and/or emergency events', value: '4' },
            { text: 'Stated foles and responsibilities of all parties in the implementation of the EAP are included', value: '5' },
            { text: 'Contact and emergency notificatyion details for population at risk and other relevant entiries are included', value: '6' },
            { text: 'The plan provides sufficient details for warning and communications, including polygons', value: '7' },
            { text: 'Easy-to-read flood and evacuation maps are included for each dam hazard event or emergency event', value: '8' },
            { text: 'The effectiveness of the plan has been demonstrated, for example, plan testing and staff implementation training', value: '9' },
            { text: 'The assessment has been prepared in conjunction with the Departmental FIA guidelines', value: '10' },
            { text: 'The report justifies the appropriateness of the assessment methodology and provides details on assumption made', value: '11' },
            { text: 'Details of site inspection are included in the report', value: '12' },
            { text: 'The incremental population at risk for the critical failure scenario has been establishd', value: '13' },
            { text: 'Flood maps are included for each failure scenario tested', value: '14' },
            { text: 'The report provides details on how dam breaches were calculated and includes the hydrographs', value: '15' },
            { text: 'Details of sensitivity checks for ky model parameters have been included', value: '16' },
            { text: 'The correct RPEQ certification has been attached', value: '17' },
            { text: 'The report was prepared in conjunction with Department Dam Safety Management guidelines', value: '18' },
            { text: 'The inspection was carried out by a suitably experiened dams engineer', value: '19' },
            { text: 'A visual inspection of physical deficiencies of the dam was undertaken', value: '20' },
            { text: 'A review of surveillance data was undertaken', value: '21' },
            { text: 'The inspection report provides details of priorities, reponsibilities and time-frames for each recommended action', value: '22' },
            { text: 'The inspection report provides a status update for actions identified in previous reports', value: '23' },
            { text: 'The report includes details of the dam safety management program assessment, deficiencies and strategies to address these', value: '24' },
            { text: 'The report has been prepared in conjunction with Guidelines on Acceptable Flood Capacity for Water Dams', value: '25' },
            { text: 'The report was prepared in conjunction with Queensland Dam Safety Management guidelines', value: '26' }
        ],
        filteredCheckBoxOptions: [],
        selectedCheckBoxes: [],
        submissionCheckBoxMapping: {
            '1': [1,2,3,4,5,6,7,8,9], // 'Emergency Action Plan'
            '2': [10,11,12,13,15,16,17], //  'Failure Impact Assessment'
            '3': [18,19,20,21,22,23], //'Annual Inspection Report'
            '4': [18,19,20,21,22,23,24], // 'Comprehensive Insection Report'
            '5': [25], // 'Acceptable Flood Capacity Report'
            '6': [], // 'Emergency Event Report',
            '7': [26], // 'Safety Review'
            '8': [26], // Instrumentation Report
            '9': [26], // 'Operating and Maintenance Manuals',
            '10': [26] ,// 'Data Book'
            '11': [26], // 'Standard Operating Procedures'
            '12': [26], // 'Design Report'
            '13': [26], // 'Contruction Report'
            '14': [26], // 'As-constructed Drawings'
            '15': [26], // 'Special Inspection Report'
            '16': [26], // 'Decommissioning Report'
            '17': [] // 'Other'
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onSubmissionTypeChanged(){

          console.log('running');
        //   
        // let apiUrl = _spPageContextInfo.webServerRelativeUrl;
        // let doc = 'some doc';
        // let folder = 'some folder';

        //  let _attachmentService = new AttachmentService(doc, folder);
        //  _attachmentService.AttachFiles();

          //reset selected options and checkboxes
          this.filteredCheckBoxOptions = [];
          this.selectedCheckBoxes = [];

          // obtain value
          let val = this.form.submissionType;
          let checkValuesArray = this.submissionCheckBoxMapping[val];
        //   console.log(checkValuesArray); 

        this.submissionCheckBoxOptions.forEach(element => {
            // const foundOption = 
            checkValuesArray.forEach(id => {
                if (element.value == id){
                    this.filteredCheckBoxOptions.push(element);
                }
            });
            // const foundOption = family.filter(({ age }) => age > 18 );

        });

      },
      onCheckBoxesSelected(){
          console.log(this.selectedCheckBoxes);
      },
      formatNames(files) {
        if (files.length === 1) {
            this.files.push(file);
          return files[0].name
        } else {
          this.files.push(files);
          return `${files.length} files selected`
          
        }
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    /* .upload-body {
        border: 1px solid red;
        padding: 20px;
    } */
</style>
