@extends('layouts.authenticated')

@section('content')
    <div class="container-fluid p-4">
        <div class="d-flex align-items-center justify-content-center gap-4 mb-4">
            <div class="logo-container">
                <div class="plugin-logo-image">
                    <img src="https://retail-express-1-5019.develop-1.saasintegrator.co/logo/sm.svg" alt="Plugin Logo" />
                </div>
            </div>

            <div class="swap-icon">
                <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" viewBox="0 0 32 32"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6667 4L5.33333 9.33333L10.6667 14.6667" stroke="#4F39F6" stroke-width="2.66667"
                        stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M5.33333 9.33333H26.6667" stroke="#4F39F6" stroke-width="2.66667" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M21.3333 28L26.6667 22.6667L21.3333 17.3333" stroke="#4F39F6" stroke-width="2.66667"
                        stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M26.6667 22.6667H5.33333" stroke="#4F39F6" stroke-width="2.66667" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>

            <div class="shopify-logo-container">
                <img src="https://shopify-1-4297.develop-1.saasintegrator.co/logo/sm.svg" alt="Shopify">
            </div>
        </div>

        <div class="mb-4">
            <div class="text-center"
                style="font-family: 'Geist', sans-serif; font-size: 24px; font-weight: 600; color: #101828;"></div>
        </div>

        <setup-progress />
    </div>
@endsection
