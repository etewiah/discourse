class BulkHappeningSerializer < ActiveModel::Serializer
  attributes :id, :title, :when_retrieved, :raw_json, :source
end
