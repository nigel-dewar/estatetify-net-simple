import { SyntheticEvent } from 'react';
import { IProperty } from './../models/property';
import {observable, action, computed,runInAction} from 'mobx'; 
import api from '../api/api';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';



export default class PropertyStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    @observable propertyRegistry = new Map();
    @observable property: IProperty | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';

    @computed get propertiesByDate() {
        return Array.from(this.propertyRegistry.values()).sort((a,b) => Date.parse(a.availableDate!) - Date.parse(b.availableDate!))
    }

    @action loadProperties = async () => {
        this.loadingInitial = true;
        try {
            const properties = await api.Properties.list();
            runInAction('loading properties', ()=> {
                properties.forEach(property => {
                    // property.availableDate = property.availableDate?.split(".")[0];
                    this.propertyRegistry.set(property.id, property);
                });
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction('load properties failed', ()=> { 
                this.loadingInitial = false;
            })
            console.log(error);
        }
    }

    @action loadProperty = async (id: string) => {
        let property = this.getProperty(id);
        if (property) {
            this.property = property;
            return property;
        } else {
            this.loadingInitial = true;
            try {
                property = await api.Properties.details(id);
                // debugger
                runInAction('getting property',()=> {
                    this.property = property;
                    this.propertyRegistry.set(property.id, property);
                    this.loadingInitial = false;
                });
                return property;
            } catch (error) {
                runInAction('get property error',()=> {
                    this.loadingInitial = false;
                })
            }
        }
    }


    @action clearProperty = () => {
        this.property = null;
    }

    getProperty = (id: string) => {
        return this.propertyRegistry.get(id);
    }

    @action createProperty = async (property: IProperty) => {
        this.submitting = true;
        try {
            await api.Properties.create(property);
            runInAction('creating property',()=> {
                this.propertyRegistry.set(property.id, property);
                this.submitting = false;
            });
            history.push(`/properties/${property.id}`);
        } catch (error) {
            runInAction('creating property failed',()=> {
                this.submitting = false;
            });
            toast.error('Problem submitting data')
            console.log(error.response);
        }
    }

    @action editProperty = async (property: IProperty) => {
        this.submitting = true;
        try {
            await api.Properties.update(property);
            runInAction('editing property',() => {
                this.propertyRegistry.set(property.id, property);
                this.property = property;
                this.submitting = false;
            });
            history.push(`/properties/${property.id}`)
            
        } catch (error) {
            runInAction('editing property failed',()=> {
                this.submitting = false;
            })
            toast.error('Problem submitting data')
            console.log(error.response);
        }
    }

    @action deleteProperty = async (id: string, event: SyntheticEvent<HTMLButtonElement>) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await api.Properties.delete(id);
            runInAction('deleting property',()=> {
                this.propertyRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            })
            
        } catch (error) {
            runInAction('deleting property failed',()=> {
                this.submitting = false;
                this.target = '';
            })
            console.log(error);
        }
    }

}

