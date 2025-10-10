@extends('layouts.authenticated')

@section('content')
    <div class="container-fluid px-4 py-4">
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">My Connections</li>
            </ol>
        </nav>

        <!-- Header -->
        <div class="d-flex align-items-center justify-content-between mb-4">
            <div class="d-flex align-items-center gap-3">
                <div class="close-icon-box">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="text-white">
                        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        </path>
                    </svg>
                </div>
                <h1 class="h2 mb-0 fw-semibold">My Connections</h1>
            </div>
            <a href="{{ route('connections.build') }}" class="btn btn-primary-custom d-flex align-items-center gap-2">
                <i class="bi bi-plus-lg text-white"></i>
                Build New Connection
            </a>
        </div>

        <!-- Search and Filter -->
        <div class="d-flex align-items-center justify-content-between mb-4">
            <div class="position-relative">
                <i class="bi bi-search search-icon"></i>
                <input type="text" class="form-control search-input" placeholder="Search..." style="width: 16rem;">
            </div>

            <div class="d-flex align-items-center gap-2">
                <select class="form-select" style="width: 6rem;">
                    <option selected>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                </select>
            </div>
        </div>

        <connection-table></connection-table>
    </div>
@endsection
