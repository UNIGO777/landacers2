const ADMIN_API_ROUTES = {
    // Authentication routes
    LOGIN: 'https://api.landacre.in/api/admin/login',
    VERIFY_OTP: 'https://api.landacre.in/api/admin/verify',

    // Analytics
    GET_ANALYTICS: 'https://api.landacre.in/api/admin/my-analytics',

    // Notifications
    GET_NOTIFICATIONS: 'https://api.landacre.in/api/notifications',
    MARK_ALL_NOTIFICATIONS_READ: 'https://api.landacre.in/api/notifications/mark-all-read',

    GET_USERS: 'https://api.landacre.in/api/admin/get-users',
    BLOCK_USER: (userId) => `https://api.landacre.in/api/admin/block/user/${userId}`,
    UNBLOCK_USER: (userId) => `https://api.landacre.in/api/admin/unblock/user/${userId}`,
    
    // Website Feedback
    GET_WEBSITE_FEEDBACK: (page = 1) => {
        const queryParams = new URLSearchParams();
        queryParams.append('page', page);
        return `https://api.landacre.in/api/feedback/LandAcre?${queryParams.toString()}`;
    },
    UPDATE_FEEDBACK_STATUS: (feedbackId) => `https://api.landacre.in/api/feedback/LandAcre/${feedbackId}`,

    // Seller management
    BLOCK_SELLER: (sellerId) => `https://api.landacre.in/api/admin/block/seller/${sellerId}`,
    UNBLOCK_SELLER: (sellerId) => `https://api.landacre.in/api/admin/unblock/seller/${sellerId}`,

    SEARCH_USERS: (query) => `https://api.landacre.in/api/admin/search/users?query=${query}`,

    GET_SALLERS_BY_STATUS: (status, type, currentPage, SellerPerPage) => `https://api.landacre.in/api/admin/get-sellers-by-status?status=${status}&type=${type}&page=${currentPage}&perPage=${SellerPerPage}`,
    SEARCH_SALLERS: (status, type, currentPage, SellerPerPage,searchQuery) => `https://api.landacre.in/api/admin/search-sellers?query=${searchQuery}&status=${status}&type=${type}&page=${currentPage}&perPage=${SellerPerPage}`,
    
    // Featured items
    CREATE_FEATURED_ITEM: 'https://api.landacre.in/api/admin/featured-item',
    GET_FEATURED_ITEMS: (params) => {
        const queryParams = new URLSearchParams();
        
        // Add query parameters if they exist
        if (params?.itemType) queryParams.append('itemType', params.itemType);
        if (params?.upcomming) queryParams.append('upcomming', params.upcomming);
        
        return `https://api.landacre.in/api/feature-items?${queryParams.toString()}`;
    },
    DELETE_FEATURED_ITEM: (itemId) => `https://api.landacre.in/api/admin/featured-item/${itemId}`,

    // Property search
    SEARCH_PROPERTIES: (params) => {
        const queryParams = new URLSearchParams();
        
        // Add all query parameters if they exist
        if (params.propertyType) queryParams.append('propertyType', params.propertyType);
        if (params.transactionType) queryParams.append('transactionType', params.transactionType);
        if (params.locality) queryParams.append('locality', params.locality);
        if (params.city) queryParams.append('city', params.city);
        if (params.state) queryParams.append('state', params.state);
        if (params.status) queryParams.append('status', params.status);
        if (params.sellerName) queryParams.append('sellerName', params.sellerName);
        if (params.sellerEmail) queryParams.append('sellerEmail', params.sellerEmail);
        if (params.page) queryParams.append('page', params.page);
        if (params.query) queryParams.append('searchQuery', params.query)

        return `https://api.landacre.in/api/admin/search/properties?${queryParams.toString()}`;
    },

    
    // Property management
    APPROVE_PROPERTY: (propertyId) => `https://api.landacre.in/api/admin/approve/property/${propertyId}`,
    DELETE_PROPERTY: (propertyId) => `https://api.landacre.in/api/admin/property/${propertyId}`,

    // Project management
    APPROVE_PROJECT: (projectId) => `https://api.landacre.in/api/admin/approve/project/${projectId}`,
    BLOCK_PROJECT: (projectId) => `https://api.landacre.in/api/admin/project/${projectId}`,

    // Project search
    SEARCH_PROJECTS: (params) => {
        const queryParams = new URLSearchParams();
        
        // Add all query parameters if they exist
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

        return `https://api.landacre.in/api/admin/search/projects?${queryParams.toString()}`;
    },
    // Feedback management
    DELETE_FEEDBACK: (feedbackId) => `https://api.landacre.in/api/feedback/LandAcre/${feedbackId}`,

    // Password management
    CHANGE_PASSWORD: 'https://api.landacre.in/api/users/changePassword',
    VERIFY_PASSWORD_OTP: 'https://api.landacre.in/api/users/changePassword/verify',
};

export default ADMIN_API_ROUTES;