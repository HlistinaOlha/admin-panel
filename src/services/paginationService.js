class PaginationService {

  createPageQueryParams = (page, pageSize) => {
    return {
      page: page,
      pageSize: pageSize,
    }
  }

  createPageInfo = (responseData) => {
    const currentPage = responseData.pagination.currentPage
    const totalPages = responseData.pagination.totalPages

    return {
      currentPage: totalPages === currentPage && currentPage !== 0 ? currentPage - 1 : currentPage,
      pageSize: responseData.pagination.pageSize,
      totalPages: totalPages
    }
  }
}

export default PaginationService
