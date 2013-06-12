# load 'deploy'
# # Uncomment if you are using Rails' asset pipeline
#     # load 'deploy/assets'
# load 'config/deploy' # remove this line to skip loading any of the default tasks

# For help deploying via Capistrano, see this thread:
# http://meta.discourse.org/t/deploy-discourse-to-an-ubuntu-vps-using-capistrano/6353

load 'deploy' if respond_to?(:namespace)
load 'deploy/assets'
Dir['vendor/plugins/*/recipes/*.rb'].each { |plugin| load(plugin) }
load 'config/deploy'
