const BASE = process.env.REACT_APP_backendUrl;

const ADMIN_API_ROUTES = {
    LOGIN: `${BASE}/api/admin/login`,
    VERIFY_OTP: `${BASE}/api/admin/verify`,
    GET_ANALYTICS: `${BASE}/api/admin/my-analytics`,
    GET_NOTIFICATIONS: `${BASE}/api/notifications`,
    MARK_ALL_NOTIFICATIONS_READ: `${BASE}/api/notifications/mark-all-read`,
    GET_USERS: `${BASE}/api/admin/get-users`,
    BLOCK_USER: (userId) => `${BASE}/api/admin/block/user/${userId}`,
    UNBLOCK_USER: (userId) => `${BASE}/api/admin/unblock/user/${userId}`,
    GET_WEBSITE_FEEDBACK: (page = 1) => {
        const queryParams = new URLSearchParams();
        queryParams.append('page', page);
        return `${BASE}/api/feedback/LandAcre?${queryParams.toString()}`;
    },
    UPDATE_FEEDBACK_STATUS: (feedbackId) => `${BASE}/api/feedback/LandAcre/${feedbackId}`,
    BLOCK_SELLER: (sellerId) => `${BASE}/api/admin/block/seller/${sellerId}`,
    UNBLOCK_SELLER: (sellerId) => `${BASE}/api/admin/unblock/seller/${sellerId}`,
    SEARCH_USERS: (query) => `${BASE}/api/admin/search/users?query=${query}`,
    GET_SALLERS_BY_STATUS: (status, type, currentPage, SellerPerPage) => `${BASE}/api/admin/get-sellers-by-status?status=${status}&type=${type}&page=${currentPage}&perPage=${SellerPerPage}`,
    SEARCH_SALLERS: (status, type, currentPage, SellerPerPage, searchQuery) => `${BASE}/api/admin/search-sellers?query=${searchQuery}&status=${status}&type=${type}&page=${currentPage}&perPage=${SellerPerPage}`,
    CREATE_FEATURED_ITEM: `${BASE}/api/admin/featured-item`,
    GET_FEATURED_ITEMS: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.itemType) queryParams.append('itemType', params.itemType);
        if (params?.upcomming) queryParams.append('upcomming', params.upcomming);
        return `${BASE}/api/feature-items?${queryParams.toString()}`;
    },
    DELETE_FEATURED_ITEM: (itemId) => `${BASE}/api/admin/featured-item/${itemId}`,
    SEARCH_PROPERTIES: (params) => {
        const queryParams = new URLSearchParams();
        if (params.propertyType) queryParams.append('propertyType', params.propertyType);
        if (params.transactionType) queryParams.append('transactionType', params.transactionType);
        if (params.locality) queryParams.append('locality', params.locality);
        if (params.city) queryParams.append('city', params.city);
        if (params.state) queryParams.append('state', params.state);
        if (params.status) queryParams.append('status', params.status);
        if (params.sellerName) queryParams.append('sellerName', params.sellerName);
        if (params.sellerEmail) queryParams.append('sellerEmail', params.sellerEmail);
        if (params.page) queryParams.append('page', params.page);
        if (params.query) queryParams.append('searchQuery', params.query);
        return `${BASE}/api/admin/search/properties?${queryParams.toString()}`;
    },
    APPROVE_PROPERTY: (propertyId) => `${BASE}/api/admin/approve/property/${propertyId}`,
    DELETE_PROPERTY: (propertyId) => `${BASE}/api/admin/property/${propertyId}`,
    APPROVE_PROJECT: (projectId) => `${BASE}/api/admin/approve/project/${projectId}`,
    BLOCK_PROJECT: (projectId) => `${BASE}/api/admin/project/${projectId}`,
    SEARCH_PROJECTS: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.projectType) queryParams.append('projectType', params.projectType);
        if (params?.status) queryParams.append('status', params.status);
        if (params?.locality) queryParams.append('locality', params.locality);
        if (params?.city) queryParams.append('city', params.city);
        if (params?.state) queryParams.append('state', params.state);
        if (params?.builderName) queryParams.append('builderName', params.builderName);
        if (params?.builderEmail) queryParams.append('builderEmail', params.builderEmail);
        if (params?.Upcoming) queryParams.append('isUpcoming', params.Upcoming);
        if (params?.page) queryParams.append('page', params.page);
        if (params?.perPage) queryParams.append('perPage', params.perPage);
        if (params?.query) queryParams.append('searchQuery', params.query);
        return `${BASE}/api/admin/search/projects?${queryParams.toString()}`;
    },
    DELETE_FEEDBACK: (feedbackId) => `${BASE}/api/feedback/LandAcre/${feedbackId}`,
    CHANGE_PASSWORD: `${BASE}/api/users/changePassword`,
    VERIFY_PASSWORD_OTP: `${BASE}/api/users/changePassword/verify`,
};

export default ADMIN_API_ROUTES;
