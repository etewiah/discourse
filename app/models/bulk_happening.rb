class BulkHappening < ActiveRecord::Base
  attr_accessible :raw_json, :source, :title, :when_retrieved
end
