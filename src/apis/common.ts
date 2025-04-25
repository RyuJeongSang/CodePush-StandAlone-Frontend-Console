import { AppItem, Request_PatchAppDeploymentItem, Response_AppDeploymentsHistory, Response_AppList } from "@/types/commonType";
import axiosInstance from "@/utils/axios";
import { AxiosResponse } from "axios";

export const processGetAppList: () => Promise<AxiosResponse<Response_AppList>>
    = async () => 
        await axiosInstance.get('apps');

export const processGetAppDetail: (appName: string) => Promise<AxiosResponse<AppItem>>
    = async (appName: string) => 
        await axiosInstance.get(`apps/${appName}`);

export const processGetAppDeploymentsHistory: (appName: string, deployment: string) => Promise<AxiosResponse<Response_AppDeploymentsHistory>>
    = async (appName: string, deployment: string) => 
        await axiosInstance.get(`apps/${appName}/deployments/${deployment}/history`);

export const processPatchAppDeploymentItem: (appName: string, deployment: string, param: Request_PatchAppDeploymentItem) => Promise<AxiosResponse<void>>
    = async (appName: string, deployment: string, param: Request_PatchAppDeploymentItem) => 
        await axiosInstance.patch(`apps/${appName}/deployments/${deployment}/release`, param);
