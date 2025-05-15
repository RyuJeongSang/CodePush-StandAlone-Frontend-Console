import { AppDetailInfo, Request_PatchAppDeploymentItem, Response_AppDeploymentsHistory, Response_AppList } from "@/types/commonType";
import { createServerSideAxiosInstance } from "@/utils/serverAxios";
import { AxiosResponse } from "axios";

// SSR 컨텍스트에서의 API 호출 함수들
export const processGetAppList = async (): Promise<AxiosResponse<Response_AppList>> => {
    const serverAxios = await createServerSideAxiosInstance();
    return await serverAxios.get('apps');
};

export const processGetAppDetail = async (appName: string): Promise<AxiosResponse<AppDetailInfo>> => {
    const serverAxios = await createServerSideAxiosInstance();
    return await serverAxios.get(`apps/${appName}`);
};

export const processGetAppDeploymentsHistory = async (
    appName: string, 
    deployment: string
): Promise<AxiosResponse<Response_AppDeploymentsHistory>> => {
    const serverAxios = await createServerSideAxiosInstance();
    return await serverAxios.get(`apps/${appName}/deployments/${deployment}/history`);
};

export const processPatchAppDeploymentItem = async (
    appName: string, 
    deployment: string, 
    param: Request_PatchAppDeploymentItem
): Promise<AxiosResponse<void>> => {
    const serverAxios = await createServerSideAxiosInstance();
    return await serverAxios.patch(`apps/${appName}/deployments/${deployment}/release`, param);
};
