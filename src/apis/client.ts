'use client';

import { AppItem, Request_PatchAppDeploymentItem, Response_AppDeploymentsHistory, Response_AppList } from "@/types/commonType";
import axiosInstance from "@/utils/axios";
import { AxiosResponse } from "axios";

// 클라이언트 전용 API 호출
export const clientGetAppList = async (): Promise<Response_AppList> => {
    if (!axiosInstance) {
        throw new Error('axios 인스턴스가 초기화되지 않았습니다.');
    }
    const response = await axiosInstance.get('apps');
    return response.data;
};

export const clientGetAppDetail = async (appName: string): Promise<AppItem> => {
    if (!axiosInstance) {
        throw new Error('axios 인스턴스가 초기화되지 않았습니다.');
    }
    const response = await axiosInstance.get(`apps/${appName}`);
    return response.data;
};

export const clientGetAppDeploymentsHistory = async (
    appName: string, 
    deployment: string
): Promise<Response_AppDeploymentsHistory> => {
    if (!axiosInstance) {
        throw new Error('axios 인스턴스가 초기화되지 않았습니다.');
    }
    const response = await axiosInstance.get(`apps/${appName}/deployments/${deployment}/history`);
    return response.data;
};

export const clientPatchAppDeploymentItem = async (
    appName: string, 
    deployment: string, 
    param: Request_PatchAppDeploymentItem
): Promise<void> => {
    if (!axiosInstance) {
        throw new Error('axios 인스턴스가 초기화되지 않았습니다.');
    }
    await axiosInstance.patch(`apps/${appName}/deployments/${deployment}/release`, param);
}; 