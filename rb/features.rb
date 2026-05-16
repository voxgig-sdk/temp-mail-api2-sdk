# TempMailApi2 SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module TempMailApi2Features
  def self.make_feature(name)
    case name
    when "base"
      TempMailApi2BaseFeature.new
    when "test"
      TempMailApi2TestFeature.new
    else
      TempMailApi2BaseFeature.new
    end
  end
end
