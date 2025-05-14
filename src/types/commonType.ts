export interface Response_AppList {
    apps: AppItem[]
}

export interface AppItem {
    name: string
    collaborators: {
        [key: string]: {
            permission: string;
            isCurrentAccount?: boolean;
        }
    }
    deployments: string[]
}

export interface AppDetailInfo {
    app: AppItem
}

export interface Response_AppDeploymentsHistory {
    history: HistoryItem[]
}

export interface HistoryItem {
    description: string
    isDisabled: boolean
    isMandatory: boolean
    rollout?: number
    appVersion: string
    packageHash: string
    blobUrl: string
    size: number
    manifestBlobUrl: string
    releaseMethod: string
    uploadTime: number
    label: string
    releasedBy: string
}

export interface Request_PatchAppDeploymentItem {
    appVersion?: string
    description?: string
    isDisabled?: boolean
    isMandatory?: boolean
    rollout?: number
    label?: string
    packageHash?: string
}
