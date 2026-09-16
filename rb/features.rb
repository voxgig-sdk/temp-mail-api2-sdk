# TempMailApi2 SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module TempMailApi2Features
  def self.make_feature(name)
    case name
    when "base"
      TempMailApi2BaseFeature.new
    when "ratelimit"
      TempMailApi2RatelimitFeature.new
    when "retry"
      TempMailApi2RetryFeature.new
    when "test"
      TempMailApi2TestFeature.new
    when "timeout"
      TempMailApi2TimeoutFeature.new
    else
      TempMailApi2BaseFeature.new
    end
  end
end
