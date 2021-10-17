import axios from "axios";
import Vue from "vue";

// tslint:disable-next-line no-unused-expression
new Vue( {
    computed: {
        hazPerformances(): boolean {
            return this.isLoading === false && this.performances.length > 0;
            //return false;
        },
        noPerformances(): boolean {
            return this.isLoading === false && this.performances.length === 0;
        }
    },
    data() {
        return {
            band: "",
            start: "",
            finish: "",
            performances: [],
            isLoading: true
        };
    },
    el: "#app",
    methods: {
        loadPerformances() {
            this.isLoading = true;
            axios
                .get( "/api/performances" )
                .then( ( res: any ) => {
                    function arrangePerformance(performance:any, index = 0){
                        let sortedPerformance:any = performance;

                        if (index === 0) {
                            sortedPerformance = performance.sort((a:any, b:any) =>  Date.parse(a.start) - Date.parse(b.start) || b.priority - a.priority);
                        } else {
                            let performancesNeedToSort = sortedPerformance.splice(0, index - 1);
                            performancesNeedToSort = performancesNeedToSort.sort((a:any, b:any) =>  Date.parse(a.start) - Date.parse(b.start) || b.priority - a.priority);
                            sortedPerformance = performancesNeedToSort.concat(sortedPerformance);
                        }

                        const sortedPerformanceLength:any = sortedPerformance.length;

                        for (let i = index; i < sortedPerformanceLength; i++) {
                            for (let j = i + 1; j < sortedPerformanceLength; j++) {
                                if (Date.parse(sortedPerformance[j].start) < Date.parse(sortedPerformance[i].finish)) {
                                    const tempTimeSlot = sortedPerformance[i];
                                    sortedPerformance[i] = {"band": sortedPerformance[i].band, "start": sortedPerformance[i].start, "finish": sortedPerformance[j].start, "priority": sortedPerformance[i].priority};;
                                    sortedPerformance.push({"band": tempTimeSlot.band, "start": sortedPerformance[j].finish, "finish": tempTimeSlot.finish, "priority": sortedPerformance[i].priority});
                                    arrangePerformance(sortedPerformance, i);
                                }
                            }
                        }

                        return sortedPerformance;
                    }
                    this.performances =  arrangePerformance(res.data, 0);
                    this.isLoading = false;
                } )
                .catch( ( err: any ) => {
                    this.isLoading = false;
                    console.log( err );
                } );
        },
        writeFile() {
            let performancesPayload = this.performances;
            performancesPayload.forEach((obj:any) => { delete obj.priority; });
            this.isLoading = true;
            axios
                .post( "/api/performances/update", performancesPayload)
                .then( () => {
                    this.isLoading = false;
                } )
                .catch( ( err: any ) => {
                    this.isLoading = false;
                } );
        },
    },
    mounted() {
        return this.loadPerformances();
    }
} );