app_name = "neovision_theme"
app_title = "NeoVision Theme"
app_publisher = "Godwin Ariwodo"
app_description = "An enhanced ERPNext Theme"
app_email = "sgentled@gmail.com"
app_license = "mit"

# Apps
# ------------------

# required_apps = []

# Each item in the list will be shown as an app in the apps page
# add_to_apps_screen = [
# 	{
# 		"name": "neovision_theme",
# 		"logo": "/assets/neovision_theme/logo.png",
# 		"title": "NeoVision Theme",
# 		"route": "/neovision_theme",
# 		"has_permission": "neovision_theme.api.permission.has_app_permission"
# 	}
# ]

# Enhanced CSS and JS loading
app_include_css = [
    "/assets/neovision_theme/css/neovision.css",
    "/assets/neovision_theme/css/dark-mode.css",
    "/assets/neovision_theme/css/animations.css"
]

app_include_js = [
    "/assets/neovision_theme/js/neovision.js",
    "/assets/neovision_theme/js/theme-switcher.js",
    "/assets/neovision_theme/js/particle-effects.js"
]

# Custom web pages
web_include_css = [
    "/assets/neovision_theme/css/neovision.css"
]

web_include_js = [
    "/assets/neovision_theme/js/neovision.js"
]

# Website context
website_context = {
    "favicon": "/assets/neovision_theme/images/favicon.ico",
    "splash_image": "/assets/neovision_theme/images/splash.png"
}

# Custom fixtures
fixtures = [
    {
        "dt": "Website Settings", 
        "filters": {"name": "Website Settings"}
    }
]

# Jinja environment customization
jenv = {
    "methods": [
        "neovision_theme.utils.get_theme_settings"
    ]
}

# Scheduler events for theme analytics
scheduler_events = {
    "daily": [
        "neovision_theme.tasks.update_theme_analytics"
    ]
}

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/neovision_theme/css/neovision_theme.css"
# app_include_js = "/assets/neovision_theme/js/neovision_theme.js"

# include js, css files in header of web template
# web_include_css = "/assets/neovision_theme/css/neovision_theme.css"
# web_include_js = "/assets/neovision_theme/js/neovision_theme.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "neovision_theme/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "neovision_theme/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "neovision_theme.utils.jinja_methods",
# 	"filters": "neovision_theme.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "neovision_theme.install.before_install"
# after_install = "neovision_theme.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "neovision_theme.uninstall.before_uninstall"
# after_uninstall = "neovision_theme.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "neovision_theme.utils.before_app_install"
# after_app_install = "neovision_theme.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "neovision_theme.utils.before_app_uninstall"
# after_app_uninstall = "neovision_theme.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "neovision_theme.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"neovision_theme.tasks.all"
# 	],
# 	"daily": [
# 		"neovision_theme.tasks.daily"
# 	],
# 	"hourly": [
# 		"neovision_theme.tasks.hourly"
# 	],
# 	"weekly": [
# 		"neovision_theme.tasks.weekly"
# 	],
# 	"monthly": [
# 		"neovision_theme.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "neovision_theme.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "neovision_theme.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "neovision_theme.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["neovision_theme.utils.before_request"]
# after_request = ["neovision_theme.utils.after_request"]

# Job Events
# ----------
# before_job = ["neovision_theme.utils.before_job"]
# after_job = ["neovision_theme.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"neovision_theme.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

