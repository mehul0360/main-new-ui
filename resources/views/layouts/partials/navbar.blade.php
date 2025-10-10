<div class="sidebar">
    <!-- Logo Section -->
    <div class="horizontal-border">
        <div class="logo-section">
            <div class="logo-container">
                <div class="logo-image"></div>
                <p class="logo-text">SaasIntegrator</p>
            </div>
        </div>
    </div>

    <!-- User Section -->
    <div class="horizontal-border">
        <div class="user-section">
            <div class="user-container">
                <div class="user-avatar">
                    <p class="user-initials">NL</p>
                </div>
                <p class="user-name">Nicholas Leach</p>
            </div>
        </div>
    </div>

    <!-- Menu Content -->
    <div class="menu-content">
        <!-- Menu Section -->
        <div class="menu-section">
            <p class="section-heading">Menu</p>
            <div class="nav-links">
                <a href="{{ route('connections.index') }}" class="nav-link-item">
                    <div class="nav-icon">
                        <img src="{{ asset('/images/icons/connections.svg') }}" alt="My Connection Icon" />
                    </div>
                    <p class="nav-text">My Connections</p>
                </a>
                <a href="#" class="nav-link-item">
                    <div class="nav-icon">
                        <img src="{{ asset('/images/icons/data.svg') }}" alt="Data Icon" />
                    </div>
                    <p class="nav-text">Data</p>
                </a>
            </div>
        </div>

        <!-- Admin Section -->
        <div class="menu-section">
            <p class="section-heading">Admin</p>
            <div class="nav-links">
                <a href="#" class="nav-link-item">
                    <div class="nav-icon">
                        <img src="{{ asset('/images/icons/plans.svg') }}" alt="Plans Icon" />
                    </div>
                    <p class="nav-text">Plans</p>
                </a>
                <a href="#" class="nav-link-item">
                    <div class="nav-icon">
                        <img src="{{ asset('/images/icons/plugins.svg') }}" alt="Plugins Icon" />
                    </div>
                    <p class="nav-text">Plugins</p>
                </a>
                <a href="#" class="nav-link-item">
                    <div class="nav-icon">
                        <img src="{{ asset('/images/icons/users.svg') }}" alt="Users Icon" />
                    </div>
                    <p class="nav-text">Users</p>
                </a>
                <a href="#" class="nav-link-item">
                    <div class="nav-icon">
                        <img src="{{ asset('/images/icons/settings.svg') }}" alt="Settings Icon" />
                    </div>
                    <p class="nav-text">Settings</p>
                </a>
                <a href="#" class="nav-link-item">
                    <div class="nav-icon">
                        <img src="{{ asset('/images/icons/debug.svg') }}" alt="Debug Icon" />
                    </div>
                    <p class="nav-text">Debug</p>
                </a>
            </div>
        </div>
    </div>
</div>
