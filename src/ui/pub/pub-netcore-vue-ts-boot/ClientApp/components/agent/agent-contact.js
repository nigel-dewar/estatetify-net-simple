export default {
    name: 'AgentContact',
    props: {
        listing: {}
    },
    data() {
        return {
            showPhoneNumber: false
        };
    },
    methods: {
        showCallInfo() {
            this.showPhoneNumber = true;
        },
        showEmailInfo() {}
    }
};
